const { response } = require('express');
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
var path = require('path');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/Projects/POS_React_App/pos/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(".", "_") + Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
  var upload = multer({ storage: storage });



let db = new sqlite3.Database('.././pos/db/pos.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the pos database.');
});

const createTokens = (user) => {
    const accessToken = jwt.sign(
      { username: `${user.FirstName} ${user.LastName}`, id: user.ClientID },
      "jwtsecret",
      {expiresIn: '5h'}
    );
    return accessToken;
  };

router.get("/Sale", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM ItemCategories`, [], (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            else {
                res.send(JSON.stringify(rows));
            }
        })
    })
});

router.get("/Customers", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM Customers`, [], (err, rows) => {
            if (err) {
                console.log("Error accured");
                console.log(err.message);
            }
            else {
                res.send(JSON.stringify(rows));
            }
        })
    })
});

router.get("/Categories", (req, res) => {
    db.serialize(() => {
        db.all(`SELECT * FROM ItemCategories`, [], (err, rows) => {
            if (err) {
                console.log("Error accured");
                console.log(err.message);
            }
            else {
                res.send(JSON.stringify(rows));
            }
        })
    })
});


router.get('/Sale/:Category', (req, res) => {
    const category = req.params.Category;
    //console.log(category);
    const sql = `SELECT * FROM Items INNER JOIN ItemCategories ON Items.ItemCategoryID = ItemCategories.ItemCategoryID WHERE ItemCategories.ItemCategoryDescription = "${category}"`;
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            else {
                //console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
    })
});

router.put("/Sale", (req, res) => {
    //console.log(req.body);
    const orderlines = req.body.orderlines;
    const salesummary = req.body.salesummary;
    const sql1 = `INSERT INTO Sales
    (CustomerID, Date, NoOfProducts, NoOfItemsSold, GrossPrice, LineItemDiscount, Total, DiscountType, AddDiscRateValue, ModeOfPayment, AmountReceived, Balance)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [salesummary.CustomerID, salesummary.Date, salesummary.NoOfProducts, salesummary.NoOfItemsSold, salesummary.GrossPrice, salesummary.LineItemDiscount, salesummary.Total, salesummary.DiscountType, salesummary.AddDiscRateValue, salesummary.ModeOfPayment, salesummary.AmountReceived, salesummary.Balance]
    let sale_no;

    let sql2;
    db.serialize(() => {
        db.run(sql1, values, function (err) {
            if (err) {
                console.log(err.message);
                res.status(500).send("Could not record sale");
            }
            else {
                sale_no = this.lastID;
                sql2 = `INSERT INTO SaleLines
                (SaleNo, ItemNumber, Price, Discount, Qty, Total) VALUES`+ orderlines.map((orderline) => `(${sale_no}, ${orderline.ItemNumber}, ${orderline.Price}, ${orderline.Discount}, ${orderline.Qty}, ${Math.round(orderline.Price * orderline.Qty * (1 - orderline.Discount / 100))})`).join(',');
                //console.log(sql2);
                db.run(sql2, [], function (err) {
                    if (err) {
                        console.log(err.message);
                        res.status(500).send("Could not record sale");
                    }
                    else {
                        res.status(200).send("Sale have been recorded");
                    }
                })
            }
        })
    })
})

router.get("/DashboardData", (req, res) => {
    let todaySales;
    let thisWeekSales;
    let thisMonthSales;
    let thisYearSales;
    let monthlySales;
    let top_customer_last_month;
    let top_customer_this_month;
    let top_product_last_month;
    let top_product_this_month; 

    //Getting current date, month and year
    let date = new Date;
    let getDate = date.getDate();
    if (getDate < 10) {
        getDate = '0' + getDate;
    }
    let getMonth = date.getMonth() + 1;
    if (getMonth < 10) {
        getMonth = '0' + getMonth;
    }
    let getYear = date.getFullYear();
    let today = `${getYear}-${getMonth}-${getDate}`;

    let sql_for_today_sale = `SELECT sum(AmountReceived) FROM Sales WHERE date = '${today}'`;

    //Getting Date Range of Current Month
    let startofMonth = `${getYear}-${getMonth}-01`;
    let endofMonth = `${getYear}-${getMonth}-31`;

    let sql_for_monthly_sale = `SELECT sum(AmountReceived) FROM Sales WHERE date BETWEEN '${startofMonth}' AND '${endofMonth}'`;

    //Getting Date Range of Current Year
    let startofYear = `${getYear}-01-01`;
    let endofYear = `${getYear}-12-31`;

    let sql_for_yearly_sale = `SELECT sum(AmountReceived) FROM Sales WHERE date BETWEEN '${startofYear}' AND '${endofYear}'`;

    //Getting Date Range of the week
    var prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    prevMonday = prevMonday.toISOString().slice(0, 10);

    let sql_for_weekly_sale = `SELECT sum(AmountReceived) FROM Sales WHERE date BETWEEN '${prevMonday}' AND '${today}'`;
    let sql_for_monthwise_sale  = `SELECT sum(AmountReceived) As MonthlySales, strftime('%Y-%m', Date) As Months from Sales WHERE Months BETWEEN strftime('%Y-%m', 'now', '-12 months') AND strftime('%Y-%m', 'now') GROUP BY Months`;
    let sql_for_top_customer_curr_month = `SELECT sum(sales.AmountReceived) AS 'Sales', sales.CustomerID, Customers.CustomerFirstName from sales INNER JOIN Customers ON Customers.CustomerID = sales.CustomerID WHERE strftime('%Y-%m', sales.Date) = strftime('%Y-%m', 'now') AND sales.CustomerID != 1 GROUP BY sales.CustomerID ORDER BY Sales DESC LIMIT 1`;
    let sql_for_top_customer_prev_month = `SELECT sum(sales.AmountReceived) AS 'Sales', sales.CustomerID, Customers.CustomerFirstName from sales INNER JOIN Customers ON Customers.CustomerID = sales.CustomerID WHERE strftime('%Y-%m', sales.Date) = strftime('%Y-%m', 'now', '-1 month') AND sales.CustomerID != 1 GROUP BY sales.CustomerID ORDER BY Sales DESC LIMIT 1`;
    let sql_for_top_product_curr_month = `SELECT SaleLines.ItemNumber, Items.ItemDescription, sum(SaleLines.Total) AS 'TotalSales' From (SaleLines INNER JOIN Items ON SaleLines.ItemNumber = Items.ItemNumber) INNER JOIN Sales ON Sales.SaleNo = SaleLines.SaleNo WHERE strftime('%Y-%m', Sales.Date) = strftime('%Y-%m', 'now') GROUP BY SaleLines.ItemNumber ORDER BY TotalSales DESC LIMIT 1`;
    let sql_for_top_product_prev_month = `SELECT SaleLines.ItemNumber, Items.ItemDescription, sum(SaleLines.Total) AS 'TotalSales' From (SaleLines INNER JOIN Items ON SaleLines.ItemNumber = Items.ItemNumber) INNER JOIN Sales ON Sales.SaleNo = SaleLines.SaleNo WHERE strftime('%Y-%m', Sales.Date) = strftime('%Y-%m', 'now', '-1 month') GROUP BY SaleLines.ItemNumber ORDER BY TotalSales DESC LIMIT 1`;
    let data = {};
    const setData = () => {
        data['todaySales'] = todaySales;
        data['thisWeekSales'] = thisWeekSales;
        data['thisMonthSales'] = thisMonthSales;
        data['thisYearSales'] = thisYearSales;
        data['monthwiseSales'] = monthlySales;
        data['top_customer_last_month'] = top_customer_last_month;
        data['top_customer_this_month'] = top_customer_this_month;
        data['top_product_last_month'] = top_product_last_month;
        data['top_product_this_month'] = top_product_this_month;
        data = JSON.stringify(data);
        //console.log(data);
        res.send(data);
    }
        db.serialize(() => {
            db.get(sql_for_today_sale, [], (err, row) => {
                if (err) {
                    res.status(500);
                }
                else {
                    todaySales = row['sum(AmountReceived)'];
                    //console.log(todaySales);
                }
            });
            db.get(sql_for_weekly_sale, [], (err, row) => {
                if (err) {
                    res.status(500);
                }
                else {
                    thisWeekSales = row['sum(AmountReceived)'];
                    //console.log(thisWeekSales);
                }
            });
            db.get(sql_for_monthly_sale, [], (err, row) => {
                if (err) {
                    res.status(500);
                }
                else {
                    thisMonthSales = row['sum(AmountReceived)'];
                    //console.log(thisMonthSales);
                }
            });
            db.get(sql_for_yearly_sale, [], (err, row) => {
                if (err) {
                    res.status(500);
                }
                else {
                    thisYearSales = row['sum(AmountReceived)'];
                }
            })
            db.all(sql_for_monthwise_sale, [], (err, rows) => {
                if(err) {
                    res.status(500);
                }
                else {
                    monthlySales = rows;
                }
            })
            db.get(sql_for_top_customer_prev_month, [], (err, row) => {
                if(err) {
                    res.status(500);
                }
                else {
                    if(row) {
                        top_customer_last_month = row;
                    }
                    else {
                        top_customer_last_month = "";
                    }
                    
                }
            })
            db.get(sql_for_top_customer_curr_month, [], (err, row) => {
                if(err) {
                    res.status(500);
                }
                else {
                    if(row) {
                        top_customer_this_month = row;
                    }
                    else {
                        top_customer_this_month = {
                            Sales: 0,
                            CustomerID: "",
                            CustmoerFirstName: ""
                        }
                    }
                    
                }
            })
            db.get(sql_for_top_product_curr_month, [], (err, row) => {
                if(err) {
                    res.status(500);
                }
                else {
                    if(row) {
                        top_product_this_month = row;
                    }
                    else {
                        top_product_this_month = {
                            ItemNumber: "",
                            ItemDescription: "",
                            TotalSales: 0
                        }
                    }
                }
            })
            db.get(sql_for_top_product_prev_month, [], (err, row) => {
                if(err) {
                    res.status(500);
                }
                else {
                    if(row) {
                        top_product_last_month = row;
                        setData();
                    }
                    else {
                        top_product_last_month = "";
                        setData();
                    }
 
                }
            })


        })
});

router.post("/AddCategory", upload.single('image'), (req, res) => {
    //let extension = path.extname(req.file.originalname);
    //console.log(req.file);
    //console.log(req.body);
    let imageSource = `images/${req.file.filename}`;
    let itemCategory = req.body.name;
    let sql = `INSERT INTO ItemCategories (ItemCategoryDescription, ImageSource) VALUES('${itemCategory}', '${imageSource}')`;
    db.run(sql, [], (err) => {
        if(err) {
            console.log(err.message);
            res.status(500).send("Category Could not added");
        }
        else {
            res.status(200).send("Category Have Been Added");
        }
    })
      });

router.post('/AddItem', upload.single('itemImage'), (req, res) => {
    let imageSource = `images/${req.file.filename}`;
    let ItemDescription = req.body.name;
    let category = Number(req.body.category);
    let price = Number(req.body.price);
    let Discount = Number(req.body.discount);
    //console.log(ItemDescription + category + price + Discount);
    let sql = `INSERT INTO Items (ItemDescription, ItemImageSource, ItemCategoryID, Price, Discount) VALUES('${ItemDescription}', '${imageSource}', ${category}, ${price}, ${Discount})`;
    //console.log(sql);
    db.run(sql, [], (err) => {
        if(err) {
            console.log(err.message);
            res.status(500).send("Item Could not added");
        }
        else {
            res.status(200).send("Item have been added");
        }
    })
      });

router.post('/AddCustomer', (req, res) => {
    let sql = `INSERT INTO Customers (CustomerFirstName, CustomerLastName, CustomerContactNo, CustomerEmailAddress, CustomerAddress, CustomerTown, CustomerCity) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.contactNumber}', '${req.body.email}', '${req.body.address}', '${req.body.town}', '${req.body.city}')`;
    //console.log(req.body);
    db.run(sql, [], (err) => {
        if(err) {
            console.log(err.message);
            res.status(500).send("Customer Could not added");
        }
        else {
            res.status(200).send("Customer have been added");
        }
    })
})

router.post('/Signup', (req, res) => {
    const saltRounds = 10;
    const date = new Date();
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const BrandName = req.body.BrandName;
    let Password = req.body.Password;
    const RegisteredOn = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const LastUpdated = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    //Check if User Already Exists
    const sql1 = `SELECT Email from Clients WHERE Email = '${Email}'`;
    db.get(sql1, [], (err, row) => {
        if(err) {
            res.status(500).send("Could not Registered");
        }
        else if(row) {
            res.status(500).send('User Already Exist');
        }
        else {
            bcrypt.hash(Password, saltRounds, function(err, hash) {
                Password = hash;
                const sql2 = `INSERT INTO Clients (FirstName, LastName, Email, BrandName, Password, RegisteredOn, LastUpdated) VALUES('${FirstName}', '${LastName}', '${Email}', '${BrandName}', '${Password}', '${RegisteredOn}', '${LastUpdated}')`;
                if(err) {
                    res.status(500).send('Could not Registered');
                }
                else {
                    db.run(sql2, [], (err) => {
                        if(err) {
                            console.log(err.message);
                            res.status(500).send("Could not Registered");
                        }
                        else {
                            res.status(200).send("Your have been registered please login");
                        }
                    })
                }
              });
        }
    })


 
})

router.post('/Login', (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    // Check if User Exist
    const sql = `SELECT * FROM Clients WHERE Email = '${Email}'`;
    db.get(sql, [], (err, row) => {
        if(!row) {
            res.status(400).send('User Does Not Exist');
        }
        else {
            bcrypt.compare(Password, row.Password).then((match) => {
                if(!match) {
                    res.status(400).send('Invalid Password');
                }
                else {
                    const accessToken = createTokens(row);
                    const user = {
                        Token: accessToken,
                        FirstName: row.FirstName,
                        LastName: row.LastName,
                        Email: row.Email,
                        BrandName: row.BrandName,
                        RegisteredOn: row.RegisteredOn,
                        Auth: true
                    }
                    res.status(200).send(user);
                }
            })
        }
    })
})

module.exports = router;
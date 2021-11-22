const { response } = require('express');
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('.././pos/db/pos.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the pos database.');
});

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
    let data = {};
    const setData = () => {
        data['todaySales'] = todaySales;
        data['thisWeekSales'] = thisWeekSales;
        data['thisMonthSales'] = thisMonthSales;
        data['thisYearSales'] = thisYearSales;
        data['monthwiseSales'] = monthlySales;
        data = JSON.stringify(data);
        console.log(data);
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
                    setData();
                }
            })

        })
})



module.exports = router;
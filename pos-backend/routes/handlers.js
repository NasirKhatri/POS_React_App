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
        db.run(sql1, values, function(err) {
            if(err) {
                console.log(err.message);
                res.status(500).send("Could not record sale");
            }
            else {
                sale_no = this.lastID;
                sql2 = `INSERT INTO SaleLines
                (SaleNo, ItemNumber, Price, Discount, Qty, Total) VALUES`+orderlines.map((orderline) => `(${sale_no}, ${orderline.ItemNumber}, ${orderline.Price}, ${orderline.Discount}, ${orderline.Qty}, ${Math.round(orderline.Price * orderline.Qty * (1 - orderline.Discount / 100))})`).join(',');
                //console.log(sql2);
                db.run(sql2, [], function(err) {
                    if(err) {
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



module.exports = router;
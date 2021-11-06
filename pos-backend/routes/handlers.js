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

router.get('/Sale/:Category', (req, res) => {
    const category = req.params.Category;
    console.log(category);
    const sql = `SELECT * FROM Items INNER JOIN ItemCategories ON Items.ItemCategoryID = ItemCategories.ItemCategoryID WHERE ItemCategories.ItemCategoryDescription = "${category}"`;
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(rows);
                res.send(JSON.stringify(rows));
            }
        })
    })
});


module.exports = router;
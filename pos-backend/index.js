const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handlers.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', routesHandler);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(PORT);
})


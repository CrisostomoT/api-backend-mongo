//imports
const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./db/config');
const morgan = require('morgan');
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');


//load .env variables
dotenv.config();
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors('*'))
app.use(morgan('dev'))

connectDatabase();

const port = process.env.PORT || 8000

app.listen(
    port,
    console.log(
        "Server connected on port " + port
    ))

app.use("/api", routes)
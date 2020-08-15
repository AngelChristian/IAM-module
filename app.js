const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const helmet = require("helmet");
var cors = require("cors");


//intialize database
require('./configs/db');

app.use(bodyParser.json());

// Routes
const mainRoute = require("./routes/apis/index");
const logger = require("./configs/config/logger");

// middleware
app.use("/api", mainRoute);
app.use(helmet());
app.use(cors());
//  app.use('/',logger);

module.exports = app;
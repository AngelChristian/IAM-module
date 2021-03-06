const express = require('express');
 const Sentry = require('@sentry/node');
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const helmet = require("helmet");
var cors = require("cors");
const port = process.env.PORT || 3000;

// sentry.io init
Sentry.init({ dsn: process.env.SENTRY });
app.use(Sentry.Handlers.requestHandler());

//intialize database
require('./configs/db');

app.use(bodyParser.json());

//test to check sentry is working
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());


// Routes
const mainRoute = require("./routes/apis/index");
const logger = require("./configs/config/logger");

// middleware
app.use("/api", mainRoute);
app.use(helmet());
app.use(cors());


//intialize main app
app.listen(port, () =>
  logger.info(`Example app listening at http://localhost:${port}`)
);
module.exports = app;
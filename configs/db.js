const mongoose = require('mongoose');
const logger = require("../configs/config/logger");


const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/testIAM';

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    logger.info("DB CONNECTED");
  })
  .catch(err => {
    logger.error('database not connected')
  });
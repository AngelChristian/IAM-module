const userController = require('../../controllers/apis/user');

const express = require('express');
let router = express.Router();
router.use('/signup', userController);
module.exports = router;
const express = require('express');
const userService = require('../../services/users/user');
const { check, validationResult } = require("express-validator");
let router = express.Router();

router.post('/',[
    check("password").isLength({ min: 8,max:32 }).withMessage("Password must be 8-32 chars long")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/).withMessage('atleast one lowercase,uppercase and numeric digit'),
  ] ,userService.createUser);
router.post("/confirmation", userService.confirmationCode);
router.post("/resend", userService.resendCode);


module.exports = router;
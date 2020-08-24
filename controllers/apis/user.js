const express = require('express');
const userService = require('../../services/users/user');
const { check, validationResult } = require("express-validator");
let router = express.Router();

router.post('/signup', [
    check("password").isLength({
      min: 8,
      max: 32
    }).withMessage("Password must be 8-32 chars long and atleast one lowercase,uppercase and numeric digit")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/).withMessage('Password must be 8-32 chars long and atleast one lowercase,uppercase and numeric digit'),
  ] ,userService.createUser);
router.post("/confirmation", userService.confirmationCode);
router.post("/resend", userService.resendCode);
router.post("/login", [
    check("email").isEmail().withMessage("please enter a valid Email"),
    check("password").isLength({ min: 1 }).withMessage("Password is required"),
  ] , userService.login);


module.exports = router;
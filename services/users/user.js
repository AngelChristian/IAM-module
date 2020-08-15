const mongoose = require("mongoose");
const User = require("../../models/user");
const Code = require("../../models/code");
var nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var crypto = require("crypto");
const { check, validationResult } = require("express-validator");

// signup user
exports.createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error:  errors.array()[0].msg });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        const user = new User({
            email: req.body.email,
            password: hash,
            user_role: req.body.user_role,
        });
        user.save((err, user) => {
            if (err || !user) {

                if (err.name == 'ValidationError') {
                    for (field in err.errors) {
                        return res.status(400).json({
                            error: err.errors[field].message
                        })
                    }
                }
                else{
                    return res.status(400).json({
                      error: err,
                    //   error:"something went wrong"
                    });
                }
            }
            if(user){
             // create token
            const token = jwt.sign({
                _id: user._id
            }, process.env.SECRET, {
                expiresIn: "1h"
            });
            // store token in cookie
            res.cookie("token", token, {
                maxAge: 3600000
            });
            //register code generation
            var code = new Code({ user_Id: user._id, code: crypto.randomBytes(16).toString('hex') });

            // Save the verification code
             code.save(function (err) {
             if (err) { return res.status(500).json({ error: err.message }); }
             });

            // sending mail
             var transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "4c9f16e6a86f85",
                pass: process.env.PASS,
              },
            });
            var mailOptions = { from: 'no-reply@IAMmodule.com', to: user.email, subject: 'Account Verification code', 
            html: `<h1>Thank you for registering,please click on the link to verify your account and provide the code mentioned</h2></br><a href="http://${req.headers.host}/api/v1/signup/confirmation">verification link(cick here)</a>
            </br><h2>code: ${code.code}</h2></br><h4>NOTE:code will be valid for 12 hours.keep it secure</h4>
            `,};
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).json({ msg: err.message }); }
                res.status(200).json({
                                user_id:user._id,
                                message:`verification mail sent to ${user.email}`
                            });
            });
        }
        });

    })
};

// check the confirmation code for verification
exports.confirmationCode =  function (req, res) {
    // increment the attempts made by user
    User.findOne({email: req.body.email },async function (err, user) {
    user.email_verification.number_attempts += 1;
    await user.save(function (err) {
                if (err) { return res.status(500).json({ message: "something went wrong,please try again" }); }
            });
        });
    // Find a matching code
    Code.findOne({ code: req.body.code }, function (err, code) {
        if (!code) return res.status(400).json({error: 'We were unable to find a valid code. Your code may have expired.' });
 
        // If we found a code, find a matching user
        User.findOne({ _id: code.user_Id, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).json({ error: 'We were unable to find a user for this code.' });
            if (user.email_verification.status=='verified') return res.status(400).json({error: 'This user has already been verified.' });
 
            // Verify and save the user
            user.email_verification.status='verified';
            user.email_verification.last_attempt=new Date();

            user.save(function (err) {
                if (err) { return res.status(500).json({ message: err.message }); }
                res.status(200).json({message:"The account has been verified. Please log in."});
            });
        });
    });
};

// resend the verification code
exports.resendCode = function (req, res) {
 
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).json({ error: 'We were unable to find a user with that email.' });
        if (user.email_verification.status=='verified') return res.status(400).json({ error: 'This account has already been verified. Please log in.'});
 
        
        Code.findOne({ user_id: user._Id }, function (err, code) {
            // Create a verification code, save it, and send email
        var code_new = crypto.randomBytes(16).toString('hex');
            code.code = code_new;
        // Save the code
        code.save(function (err) {
            if (err) { return res.status(500).json({ error: err.message }); }
        });
            // Send the email
             var transporter = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "4c9f16e6a86f85",
                pass: process.env.PASS,
              },
            });
            var mailOptions = { from: 'no-reply@IAMmodule.com', to: user.email, subject: 'Account Verification code', 
            html: `<h1>Thank you for registering,please click on the link to verify your account and provide the code mentioned</h2></br><a href="http://${req.headers.host}/api/v1/signup/confirmation">verification link(cick here)</a>
            </br><h2>code: ${code.code}</h2></br><h4>NOTE:code will be valid for 12 hours.keep it secure</h4>
            `,};
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).json({ msg: err.message }); }
                res.status(200).json({
                                user_id:user._id,
                                message:`verification mail sent to ${user.email}`
                            });
            });
        });
 
    });
};
var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4c9f16e6a86f85",
    pass: "85ebeb70c39636"
  }
});

var mailOptions = {
  from: '"Account verification" <from@example.com>',
  to: "angelchristian2599@gmail.com",
  subject: "Account verification",
  text: "Hey there, please click the below link to verify your account ",
  html:
    '<b>Hey there! </b><br> please click the below link to verify your account<br />',
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

rand = Math.floor(Math.random() * 100 + 54);
host = req.get("host");
link = "http://" + req.get("host") + "/verify?id=" + rand;
mailOptions = {
  to: req.query.to,
  subject: "Please confirm your Email account",
  html:
    "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
    link +
    ">Click here to verify</a>",
};
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {
    console.log(error);
    res.end("error");
  } else {
    console.log("Message sent: " + response.message);
    res.end("sent");
  }
});
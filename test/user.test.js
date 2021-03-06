const request = require("supertest");
const app = require("../app");
// const expect = require("expect");
const {createUser} = require("../services/users/user");
const User = require("../models/user");
const Code = require("../models/code");
var assert = require("chai").assert;

const userOne = {
  email: "angelchristian@gmail.com",
  password: "ASP26684a6",
  user_role: "Student",
};


describe('/api/v1/signup', function() {
beforeEach( async() => {
     await User.deleteMany();
    await new User(userOne).save();

});

it("It should accept only unique email", function(done){
      request(app)
        .post("/api/v1/signup")
        .send({
                "email": "angelchristian@gmail.com",
                "password": "ASP26684a6",
                "passwordConfirmation": "ASP26684a6",
                "user_role": "Student",
                })
        .expect({ "error": "email already in use."})
        .end(function(err, res){
          if (err) { throw err}
          if(res){
          done();}
        });
 });

 it("It should accept only email with proper format", function(done){
      request(app)
        .post("/api/v1/signup")
        .send({
                "email": "angel",
                "password": "ASP26684a6",
                "passwordConfirmation": "ASP26684a6",
                "user_role": "Student",
                })
        .expect({ "error": "Please fill a valid email address"})
        .end(function(err, res){
          if (err) { throw err}
          if(res){
          done();}
        });
 });

 it("It should accept only valid password", function(done){
      request(app)
        .post("/api/v1/signup")
        .send({
                "email": "angelchrigjstian@gmail.com",
                "password": "ASP",
                "user_role": "Student",
                })
        .expect({ "error": "Password must be 8-32 chars long and atleast one lowercase,uppercase and numeric digit"})
        .end(function(err, res){
          if (err) { throw err}
          if(res){
          done();}
        });
 });

})


describe('/api/v1/login', function() {
beforeEach( async() => {
     await User.deleteMany();
    await new User(userOne).save();

});

it("It should accept only proper email", function(done){
      request(app)
        .post("/api/v1/login")
        .send({
                "email": "angel",
                "password": "ASP26684a6"
                })
        .expect({ "error": "please enter a valid Email","field": "email"})
        .end(function(err, res){
          if (err) { throw err}
          if(res){
          done();}
        });
 });

 it("It should not accept wrong password", function(done){
      request(app)
        .post("/api/v1/login")
        .send({
                "email": "angelchristian@gmail.com",
                "password": "ASP"
                })
        .expect({
          "error": "email and password doesnt match"
        })
        .end(function(err, res){
          if (err) { throw err}
          if(res){
          done();}
        });
 });

})

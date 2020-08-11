var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = new mongoose.Schema(
  {
    User_id: {type:mongoose.Schema.Types.ObjectId},
    username: {
      type: String,
      maxlength: 32,
      trim: true,
      unique: true,
      partialFilterExpression: {username: {$type: "string"}}
    },
    firstname: {
      type: String,
      maxlength: 32,
      trim: true, 
      match : [
            new RegExp('^[a-z ]+$', 'i'), // allow alphabets
            'Name should have alphabets and spaces'
        ]
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
      match : [
            new RegExp('^[a-z ]+$', 'i'), // allow alphabets
            'Name should have alphabets and spaces'
        ]
    },
    email: {
      type: String,
      unique: true,  
      trim: true,
      required: [true, "email is required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, "password is required"],
      // match : [
      //       new RegExp('/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]){8,32}$/','i'), // allow alphabets
      //       'Name should have alphabets and spaces'
      //   ]
      // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password should contain 8-32 characters having atleast one uppercase,lowercase and number digit']
    },
    mobile_number: {
      code: {
        type: Number,
        maxlength: 4,
        trim: true,
      },
      mobile: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        trim: true,
      },
    },
    email_verification: {
      status: {
        type: String,
        enum: ["verified", "unverified", "invalid"],
        default: "unverified",
      },
      code: {
        type: Number,
        default: Math.floor(10000000 + Math.random() * 90000000),
      },
      number_attempts: { type: Number,default:0},
      last_attempt: { type: Date },
    },
    location: {
      strett_add_1: {
        type: String,
      },
      strett_add_2: {
        type: String,
      },
      current_city: {
        type: String,
      },
      hometown: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      pincode: {
        type: Number,
      },
    },
    user_role: {
      type: String,
      enum: [
        "Student",
        "Industry",
        "Professional",
        "Founder",
        "Recruiter",
        "Fresher",
      ],
      required: [true, "user role is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    marital_status: {
      type: String,
      enum: ["single", "married"],
    },
    birthdate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(uniqueValidator, {
  message: '{PATH} already in use.'
});


module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            "Enter a valid emailId " + value + " is not a valid email"
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password!!");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 15,
    },
    gender: {
      type: String,

      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {},
    about: {},
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

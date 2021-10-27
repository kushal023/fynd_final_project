const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isAlphanumeric(value, 'pl-PL')) {
          throw new Error('Fname cannot contain special characters.');
        }
      },
    },
    lname: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isAlphanumeric(value, 'pl-PL')) {
          throw new Error('Lname cannot contain special characters.');
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    role: { type: String, default: 'user' },
    phone: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('Passwords is too short. At least 8 characters.');
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.userJSON = function (token) {
  return {
    username: this.username,
    email: this.email,
    token: token,
  };
};

UserSchema.methods.verifypassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

UserSchema.methods.signToken = async function () {
  let payload = { userId: this.id, email: this.email };
  try {
    let token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token;
  } catch (error) {
    return error;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;


const User = require("../models/user");
const express = require("express");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "jwtsecret";


exports.getUser = async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid);

    res.json(user);
  } catch (error) {}
};


 exports.postLogin =  async (req, res) => {
    let success = false;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: "write correct credencials" });
      }
      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return res
          .status(400)
          .json({ success, errors: "write correct credencials" });
      }
      const data = {
        user: { id: user._id },
      };

      const token = jwt.sign(data, JWT_SECRET);

      res
        .json({
          success: true,
          message: "Authentication successful",
          token: token,
        })
        .redirect("/");
    } catch (error) {
      console.log({ success, error });
    }
  }
;

exports.getSignup =  (req, res) => {
  res.render(`auth/signup`);
};
exports.getLogin =  (req, res) => {
  res.render(`auth/login`);
};

exports.postSignup =  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            errors: "sorry a user with this email already exist ",
          });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      success = true;
      res.json({ success, user });
    } catch (error) {
      console.error(error.message);

      res.redirect("/signup");
    }
  };




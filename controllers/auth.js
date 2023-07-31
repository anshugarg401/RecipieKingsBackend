const crypto = require('crypto');
const User = require("../models/user");
const express = require("express");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "jwtsecret";


const  getUser = async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid);

    res.json(user);
  } catch (error) {}
};


 const  postLogin =  async (req, res) => {
    let success = false;
    let errors = validationResult(req);
    const { email, password } = req.body;


    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: errors.array()
      });
    }
    
      User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            const data = {
              user: { id: user._id },
            };
            const token = jwt.sign(data, JWT_SECRET);
            console.log({
                success: true,
                message: "Authentication successful",
                token: token,
              })
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.token = token;;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        }) .catch(err => {
          console.log(err);
          res.redirect('/auth/login');
        });


    }).redirect("/");
   
  };



const  getSignup =  (req, res,next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};





const  getLogin =  (req, res) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};





const  postSignup =  async (req, res) => {
  let success = false;
  const {email , password,usernameq } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors.array());
      return res.status(422).render("auth/signup",{
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword
        },
        validationErrors: errors.array()
      })
    }
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
      bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
      
      });
      return user.save();
    }).then(result =>{
      res.redirect("/auth/login");
    })

      success = true;
      res.json({ success, user });
    } catch (error) {
      console.error(error.message);

      res.redirect("/auth/signup");
    }
  };




  const postLogout =(req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/auth/login');
  });
  }

module.exports = {getUser,postLogin,getSignup,postSignup,getLogin,postLogout};

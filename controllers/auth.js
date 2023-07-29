const User = require('../models/user');
const express = require('express');
const router = express.Router(); 


exports.getLogin = (req, res, next) => {
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
  
  exports.getSignup = (req, res, next) => {
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
  exports.postLogin = (req, res, next) => {
    if (!req.body.username) {
      res.json({ success: false, message: "Username was not given" })
  }
  else if (!req.body.password) {
      res.json({ success: false, message: "Password was not given" })
  }
  else {
      passport.authenticate("local", function (err, user, info) {
          if (err) {
              res.json({ success: false, message: err });
          }
          else {
              if (!user) {
                  res.json({ success: false, message: "username or password incorrect" });
              }
              else {
                  const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                  req.session.user = user;
                  console.log("auth success");
                  console.log("tocken is :" + token);
                  res.json({ success: true, message: "Authentication successful", token: token }).redirect("/");
                  
                  
              }
          }
  })}
    
};
exports.postSignup = (req, res, next) => {
  User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
        res.json({ success: false, message: "Your account could not be saved. Error: " + err });
    }
    else {
        req.login(user, (err) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                req.session.user = user;
                console.log(user);
                res.json({ success: true,user, message: "Your account has been saved" })
                .redirect('/');;
                
                
            }
        });
    }
});
 };
  


  module.exports = router;
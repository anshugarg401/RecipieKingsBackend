const crypto = require('crypto');
const User = require("../models/user");
// Math = require("mathjs")



const express = require("express");
const session = require('express-session');
const nodemailer = require('nodemailer');

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


 const JWT_SECRET = "jwtsecret";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
    auth: {
      user: "94dd2e61e5cf3a",
      pass: "bd1c4ef7d4fc29"
    }
  }
);


const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport.sendMail({
    from: "anshugarg402@gmail.com",
    to: "anshugarg401@gmail.com",
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://127.0.0.1:3000/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).then(console.log("mailsent")).catch(err => console.log(err));
};
  




const  postSignup =  async (req, res) => {
  let success = false;
  const {email , password,username } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors.array());
      return res.status(422).render("auth/signup",{
        path: 'auth/signup',
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
      const token = jwt.sign(email, JWT_SECRET);

      const user =  new User({
        username : username,
        email: email,
        password: hashedPassword,
        confirmationCode: token
      
      });
      console.log(user);

      sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
 );
       
          return user;

    }).then(user =>{
      if (!errors.isEmpty()) {
        res.status(500).send({ message: "User was not registered! Please try again " }).redirect("/auth/signup")
             
          }

          user.save();
         res.send({
             message:
               "User was registered successfully! Please check your email for further verification",
          });
 
        
    })

      
    } catch (error) {
      console.error("hii"+error.message);

      res.redirect("/auth/signup");
    }
  };




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
  

// return if a error is caught
    if (!errors.isEmpty()) {

      console.log(errors.array()[0].msg)
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

    //user status must be Active to login

    

    
    return  User.findOne({ email: email })
    .then(user => {
      const { email, password } = req.body;
      if (!user) {
        console.log(req.body.password)
        console.log(user.password)
        return res.status(422).render('auth/login', {
          path: 'auth/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      console.log(req.body.password)
      console.log(user.password)
      bcrypt
        .compare(req.body.password,user.password)
        .then(doMatch => {
       
          if (doMatch) {
              console.log("hiii")
            if (user.status != "Active") {
              
              return res.status(401).send({
                message: "Pending Account. Please Verify Your Email!",
              });
            }
           
            console.log({
                success: true,
                message: "Authentication successful",
             
              })
           return res.status(200).render("/dashboard.ejs",{
            message: "loggin successful",
          })
          
       
          }
          return res.status(422).render('auth/login', {
            path: 'auth/login',
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
          // res.redirect('/auth/login');
        });


    })
   
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








  const postLogout =(req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/auth/login');
  });
  }




module.exports = {getUser,postLogin,getSignup,postSignup,getLogin,postLogout};

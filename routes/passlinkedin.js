const express = require('express'); 
const router = express.Router(); 
require("../controllers/passlinkedin");
const passport = require('passport');
const { validationResult } = require("express-validator");
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('auth/login'
    
    ,(req, res, next) => {
      req.session.destroy(err => {
        console.log(err);
        res.redirect('/auth/login');
      });
      });
  });


router.get(
    "/auth/linkedin",
    passport.authenticate("linkedin", { scope: ['r_emailaddress', 'r_liteprofile'], })
  );
  
  
  router.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }),() =>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            console.log(error);
    }
  );

  router.get("/", (req, res) => {
    if (req.user) { 
      const name = req.user.name;
      const email = req.user.email;
        console.log(req.user);
      res.send(
        `<center style="font-size:140%"> <p>User is Logged In ${name}  </p>
        <p> Linkedn Email: ${email} </p>
        </center>
        `
      )
    } else {
      res.send(`<center style="font-size:140%"> <p>User is Logged In </p>
      <p>Name: ${name} ${family} </p>
      <p> Linkedn Email: ${email} </p>
      <img src="${photo}"/>
      </center>
      `);
    }
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  
  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  router.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
  })

  module.exports = router;
const express = require('express'); 
const router = express.Router(); 
require("../controllers/passlinkedin");
const passport = require('passport');
const { validationResult } = require("express-validator");
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('<p>This is Profile Page </p>', {
      user: req.user // get the user out of session and pass to template
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
      res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
      <p>User is not Logged In</p>
      <img style="cursor:pointer;"  onclick="window.location='/auth/linkedIn'" src="http://www.bkpandey.com/wp-content/uploads/2017/09/linkedinlogin.png"/>
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
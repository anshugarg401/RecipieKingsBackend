const passport = require('passport');
require('../controllers/passport');
 const express = require('express'); 
 const router = express.Router(); 

 router.get('/', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
  });
  
  // Auth 
  router.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
  }));
  
  // Auth Callback
  router.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
  }));
  
  // Success 
  router.get('/auth/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);
  });
  
  // failure
  router.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
  })

  module.exports = router;
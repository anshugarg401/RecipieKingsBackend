const passport = require('passport');
require('../controllers/passgoogle');
 const express = require('express'); 
 const router = express.Router(); 

 router.get('/', (req, res) => {
    res.send("<button><a href='/passgoogle/auth/google'>Login With Google</a></button>")
  });
  
  // Auth 
  router.get('/auth/google' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
  }));
  
  // Auth Callback
  router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/getuser',
        failureRedirect: '/auth/callback/failure'
  }));
  
  // Success directed to getuser-- controllers/auth/

  
  // failure
  router.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
  })

  module.exports = router;
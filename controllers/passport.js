

// google authentication
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const bcrypt = require('bcrypt');
  

  
passport.use(new GoogleStrategy({
    clientID:"280455565494-cd9atn186f605589bp9tultg5qn4ridj.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"YOUR SECRET", // Your Credentials here.
    callbackURL:"http://127.0.0.1:3000/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
passport.serializeUser((user , done) => {
  done(null , user);
})
passport.deserializeUser(function(user, done) {
  done(null, user);
});
// end of google authentication


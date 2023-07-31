

// google authentication
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const bcrypt = require('bcrypt');
  

  
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET, 
    callbackURL:"http://127.0.0.1:3000/passgoogle/google/callback",
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


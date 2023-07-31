const passport = require('passport');

const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: "http://127.0.0.1:3002/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser((user , done) => {
    done(null , user);
  })
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
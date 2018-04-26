const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//use to instruct passport to how to authenticate users with Google OAuth
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy( // GoogleStrategy has the internal identifier as 'google'
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
    }
  )
);

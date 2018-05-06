const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//use to instruct passport to how to authenticate users with Google OAuth
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
// this is to fetch the users model out from mongoose. Don't need to require user file here

passport.serializeUser((user, done) => {
  done(null, user.id); //first arg is error message, second is the id created by MongoDB
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( // GoogleStrategy has the internal identifier as 'google'
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have the record with given profile Id
          done(null, existingUser);
        } else {
          // no profile Id exists, create new one
          new User({ googleId: profile.id }) //create a Mongoose model instance
            .save() // save it to our MongoDB database
            .then(user => done(null, user));
        }
      });
    }
  )
);

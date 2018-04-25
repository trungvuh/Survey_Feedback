const express = require('express');
// generate a new application represent a running express app
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//use to instruct passport to how to authenticate users with Google OAuth
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy( // GoogleStrategy has the internal identifier as 'google'
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

//If there is an environment provided by Heroku, use it, otherwise, listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT); //instruct Express to tell Node to listen to incoming traffic

const express = require('express');
// generate a new application represent a running express app
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/user');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//require the authRoutes returns a function, immediately call that fnct, passing in the app object

mongoose.connect(keys.mongoURI);

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

//If there is an environment provided by Heroku, use it, otherwise, listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT); //instruct Express to tell Node to listen to incoming traffic

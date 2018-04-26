const express = require('express');
// generate a new application represent a running express app
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);
//require the authRoutes returns a function, immediately call that fnct, passing in the app object

app.get('/', (req, res) => {
  res.send({ hello: 'worldsss' });
});

//If there is an environment provided by Heroku, use it, otherwise, listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT); //instruct Express to tell Node to listen to incoming traffic

const express = require('express');
// generate a new application represent a running express app
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// If there is an environment provided by Heroku, use it, otherwise, listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT); //instruct Express to tell Node to listen to incoming traffic

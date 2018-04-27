const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
  // Passport will see the code inside the URL and will get the user's profile
  // This is also when we have the accessToken

  app.get('/api/logout', (req, res) => {
    req.logout();
    // logout is a fnct attached automatically to the request object by passport
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

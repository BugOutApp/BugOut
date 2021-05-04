const router = require('express').Router();
const passport = require('passport');

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// auth with google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/private-page',
    failureRedirect: '/login', // here you would redirect to the login page using traditional login approach
  }),
);

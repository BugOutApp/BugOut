const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

// Signup route
router.post('/signup', (req, res) => {
  const {
    email, password, firstname, lastname,
  } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Your password must be 8 char. min.' });
  }
  if (!email) {
    return res.status(400).json({ message: 'Your email cannot be empty' });
  }

  // check if username exists in database -> show message
  User.findOne({ email })
    .then((found) => {
      if (found) {
        return res
          .status(400)
          .json({ message: 'This email is already taken' });
      }

      // hash the password, create the user and send the user to the client
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        email, password: hash, firstname, lastname,
      }).then(
        (dbUser) => {
          // login with passport:
          req.login(dbUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            return res.status(200).json(dbUser);
          });
        },
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

// Login route
router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.json(user);
    });
  })(req, res);
});

// Delete user route
router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
});

// returns the logged in user
router.get('/loggedin', (req, res) => {
  res.json(req.user);
});

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
    // eslint-disable-next-line max-len
    failureRedirect: '/login', // here you would redirect to the login page using traditional login approach
  }),
);

module.exports = router;

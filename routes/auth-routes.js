const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const router = express.Router();

// Get all users
router.get('/users', (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users);
  });
});

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
    return res
      .status(400)
      .json({ message: 'Your email cannot be empty' });
  }

  // check if email exists in database -> show message
  return User.findOne({ email })
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

router.post('/login', (req, res, next) => {
  // console.log('req.body.email:', req.body.email);
  console.log(req.sessionID);
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    return req.login(user, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// Delete user route
// router.delete('/logout', (req, res, next) => {
router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: 'Sucessful logout' });
});

// console.log('req.session:', req.session);
// if (req.session) {
//   req.session.destroy((err) => {
//     if (err) {
//       res.status(400).send('Unable to log out');
//     } else {
//       res.send('Logout successful');
//     }
//   });
// } else {
//   res.end();
// }

// req.logout();
// delete req.session;
// req.session.destroy((err) => {
//   if (err) return next(err);
//   console.log('req.session:', req.session);
//   return res.status(200).send('logged out');
// });

// returns the logged in user
router.get('/loggedin', (req, res) => {
  res.json(req.user);
});

// // when login is successful, retrieve user info
// router.get('/login/success', (req, res) => {
//   if (req.user) {
//     res.json({
//       success: true,
//       message: 'user has successfully authenticated',
//       user: req.user,
//       cookies: req.cookies,
//     });
//   }
// });

// auth with google
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: [
//       'https://www.googleapis.com/auth/userinfo.profile',
//       'https://www.googleapis.com/auth/userinfo.email',
//     ],
//   }),
// );
// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/private-page',
//     // here you would redirect to the login page using traditional login approach
//     failureRedirect: '/login',
//   }),
// );

module.exports = router;

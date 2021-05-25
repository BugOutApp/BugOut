const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const cors = require('cors');

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

app.use(
  cors({
    // this could be multiple domains/origins, but we will allow just our React app
    origin: ['http://localhost:3000'],
  }),
);

// session configuration

const session = require('express-session');

// session store using mongo
const MongoStore = require('connect-mongo')(session);

const mongoose = require('./db/index');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    // Forces the session to be saved back to the session store,
    // even if the session was never modified during the request.
    resave: true,
    store: new MongoStore({
      // mongooseConnection: mongoose.connection,
      url: 'mongodb://localhost:27017',
    }),
  }),
);
// end of session configuration

// passport configuration

const User = require('./models/User.model');

// we serialize only the `_id` field of the user to keep the information stored minimum
passport.serializeUser((user, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

// when we need the information for the user, the deserializeUser function is called with
// the id that we previously serialized to fetch the user from the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log('Google account details:', profile);

      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => done(err)); // closes User.create()
        })
        .catch((err) => done(err)); // closes User.findOne()
    },
  ),
);

app.use(passport.initialize());
app.use(passport.session());

// end of passport

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js
const index = require('./routes/index');

app.use('/api', index);

const auth = require('./routes/auth-routes');

app.use('/api/auth', auth);

// Allows access to the API from different domains/origins BEFORE session
app.use(
  cors({
    // this could be multiple domains/origins, but we will allow just our React app
    origin: ['http://localhost:3000'],
  }),
);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js

// This could be a conflict with line 104, so I commented it out. We can reinstate
// const allRoutes = require('./routes');
// app.use('/api', allRoutes);

const admin = require('./routes/admin');

app.use('/api', admin);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

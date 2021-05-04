const router = require('express').Router();
const passport = require('passport');
const authRoutes = require('./auth-routes');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

// You put the next routes here 👇

module.exports = router;

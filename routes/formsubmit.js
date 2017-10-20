const router = require('express').Router();
const bcrypt = require('bcrypt');
const createUser = require('../database/queries.js').createUser;
const verifyUser = require('../database/queries.js').verifyUser;

router.get('/formsubmit', (req, res) => {
  res.render('formsubmit');
});

router.post('/formsubmit', (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      createUser(name, email, hash);
    })
    .then((data) => {
      res.cookie('name', name);
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  verifyUser(email)
    .then((data) => {
      bcrypt.compare(password, data.password)
        .then((result) => {
          if (result) {
            res.cookie('userId', data.user_id);
            res.cookie('name', data.name);
            res.redirect('/');
          } else {
            res.render('/formsubmit', { errorMessage: 'Incorrect email or password' });
          }
        });
    });
});

module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcrypt');
const createUser = require('../database/queries.js').createUser;

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
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



module.exports = router;

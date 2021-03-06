const router = require('express').Router();
const bcrypt = require('bcrypt');
const verifyUser = require('../database/queries').verifyUser;

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  verifyUser(email)
    .then((data) => {
      bcrypt.compare(password, data.password)
        .then((result) => {
          if (result) {
            req.session.user = data.user_id;
            req.session.name = data.name;
            res.redirect('/');
          } else {
            res.render('/login', { errorMessage: 'Incorrect email or password' });
          }
        });
    });
});

module.exports = router;

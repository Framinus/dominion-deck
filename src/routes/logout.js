const router = require('express').Router();

router.post('/logout', (req, res) => {
  res.clearCookie('name');
  res.redirect('/');
});

module.exports = router;

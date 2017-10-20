const router = require('express').Router();

router.get('/game', (req, res) => {
  const name = req.cookies.name;
  if (!name) {
    res.redirect('/formsubmit');
  } else {
    res.render('game');
  }
});

module.exports = router;

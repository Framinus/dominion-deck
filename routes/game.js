const router = require('express').Router();

router.get('/game', (req, res) => {
  const name = req.cookies.name;
  if (!name) {
    res.redirect('/formsubmit');
  } else {
    const finalCards = req.cookies.finalCards;
    res.render('game', { finalCards });
  }
});

module.exports = router;

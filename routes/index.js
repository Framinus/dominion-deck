const router = require('express').Router();
const bcrypt = require('bcrypt');
const verifyUser = require('../database/queries.js').verifyUser;
const cardsFromSet = require('../database/queries.js').cardsFromSet;

router.get('/', (req, res) => {
  const name = req.cookies.name;
  if (!name) {
    res.redirect('/formsubmit');
  } else {
    res.render('index', { name });
  }
});

router.post('/', (req, res) => {
  const gameArray = req.body.game;
  console.log(gameArray);
  cardsFromSet(gameArray)
    .then((data) => {
      console.log(data);
      // res.redirect('game', { cardSet });
    })
    .catch(console.error);
});


module.exports = router;

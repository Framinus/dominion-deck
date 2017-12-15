const router = require('express').Router();
const cardsFromSet = require('../database/queries.js').cardsFromSet;
const getCardsByIds = require('../database/queries.js').getCardsByIds;

router.get('/', (req, res) => {
  const name = req.cookies.name;
  if (!name) {
    res.redirect('/signup');
  } else {
    res.render('index', { name });
  }
});

router.post('/', (req, res) => {
  const gameArray = req.body.game;
  cardsFromSet(gameArray)
    .then((data) => {
      const cardIds = [];
      data.forEach((card) => {
        cardIds.push(card.card_id);
      });
      const randomCards = [];
      while (randomCards.length < 10) {
        const randomCardIndex = Math.floor(Math.random() * (cardIds.length - 1));
        if (!randomCards.includes(cardIds[randomCardIndex])) {
          randomCards.push(cardIds[randomCardIndex]);
        }
      }
      return randomCards;
    })
    .then((randomCards) => {
      return getCardsByIds(randomCards);
    })
    .then((finalCards) => {
      res.cookie('finalCards', finalCards);
      res.redirect('/game');
    })
    .catch(console.error);
});


module.exports = router;

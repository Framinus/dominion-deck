const router = require('express').Router();
const cardsFromSet = require('../database/queries.js').cardsFromSet;
const getCardsByIds = require('../database/queries.js').getCardsByIds;
const fs = require('fs');

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
  cardsFromSet(gameArray)
    .then((data) => {
      const cardIds = [];
      data.forEach((card) => {
        cardIds.push(card.card_id);
      });
      const randomCards = [];
      while (randomCards.length < 10) {
        const randomCardIndex = Math.floor(Math.random() * (cardIds.length - 1));
        randomCards.push(cardIds[randomCardIndex]);
      }
      console.log('randomCards', randomCards);
      return randomCards;
    })
    .then((randomCards) => {
      return getCardsByIds(randomCards);
    })
    .then((finalCards) => {
      res.render('game', { finalCards });
    })
    .catch(console.error);
});


module.exports = router;

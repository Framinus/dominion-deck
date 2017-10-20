const router = require('express').Router();
const saveSet = require('../database/queries.js').saveSet;
const saveCardSet = require('../database/queries.js').saveCardSet;

router.get('/game', (req, res) => {
  const name = req.cookies.name;
  const userId = req.cookies.userId;
  if (!name) {
    res.redirect('/formsubmit');
  } else {
    const finalCards = req.cookies.finalCards;
    res.render('game', { finalCards });
  }
});

router.post('/game', (req, res) => {
  const userId = req.cookies.userId;
  console.log(userId);
  const finalCards = req.cookies.finalCards;
  const cardIds = [];
  finalCards.forEach((card) => {
    cardIds.push(card.card_id);
  });
  saveSet(userId)
    .then((saveSetData) => {
      console.log('saved set id', saveSetData);
      const setId = saveSetData.set_id;
      console.log(setId);
      return setId;
    })
    .then((setId) => {
      cardIds.forEach((card) => {
        saveCardSet(setId, card);
        console.log(card);
      });
    })
    .then((set) => {
      console.log('set saved successfully!');
    })
    .catch(console.error);
});

module.exports = router;

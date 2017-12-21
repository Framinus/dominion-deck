const router = require('express').Router();
const saveSet = require('../database/queries.js').saveSet;
const saveCardSet = require('../database/queries.js').saveCardSet;

router.get('/', (req, res) => {
  const name = req.cookies.name;
  const userId = req.cookies.userId;
  if (!name) {
    res.redirect('/login');
  } else {
    const finalCards = req.cookies.finalCards;
    res.render('game', { finalCards });
  }
});

router.post('/', (req, res) => {
  const userId = req.cookies.userId;
  const finalCards = req.cookies.finalCards;
  const cardIds = [];
  finalCards.forEach((card) => {
    cardIds.push(card.card_id);
  });
  return saveSet(userId)
    .then((saveSetData) => {
      const setId = saveSetData.set_id;
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
      res.redirect('/history');
    })
    .catch(console.error);
});

module.exports = router;

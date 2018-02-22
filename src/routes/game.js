const router = require('express').Router();
const saveSet = require('../database/queries.js').saveSet;
const saveCardSet = require('../database/queries.js').saveCardSet;

router.get('/', (req, res) => {
  const name = req.session.name;
  const userId = req.session.user;
  if (!name) {
    res.redirect('/login');
  } else {
    const finalCards = req.session.finalCards;
    res.render('game', { finalCards });
  }
});

router.post('/', (req, res) => {
  const userId = req.session.user;
  const finalCards = req.session.finalCards;
  const cardIds = [];
  finalCards.forEach((card) => {
    cardIds.push(card.card_id);
  });
  // trying to parse out what I did here - it looks like i push the ids of the finalCards into a new array, and then call saveSet with the userId. Why am I taking this step?
  return saveSet(userId)
    .then((saveSetData) => {
      const setId = saveSetData.set_id;
      return setId;
    })
    // then I am taking that setId and using it to save a set. why am I not just creating the set and saving it all at once? i think it has to do with how my sets are getting displayed to the page. 
    .then((setId) => {
      cardIds.forEach((card) => {
        saveCardSet(setId, card);
      });
    })
    .then((set) => {
      console.log('set saved successfully!');
      res.redirect('/history');
    })
    .catch(console.error);
});

module.exports = router;

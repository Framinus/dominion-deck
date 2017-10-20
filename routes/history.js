const router = require('express').Router();
const getAllSetsForUser = require('../database/queries.js').getAllSetsForUser;
const getCardsByIds = require('../database/queries.js').getCardsByIds;

router.get('/history', (req, res) => {
  const name = req.cookies.name;
  const userId = req.cookies.userId;
  getAllSetsForUser(userId)
    .then((sets) => {
      console.log('sets', sets);
      const cardNames = [];
      sets.forEach((card) => {
        cardNames.push(card.name);
      });
      return cardNames;
    })
    .then((sets) => {
      res.render('history', { name });
    })
    .catch(console.error);
});


module.exports = router;

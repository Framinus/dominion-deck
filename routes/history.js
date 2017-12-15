const router = require('express').Router();
const getAllSetsForUser = require('../database/queries.js').getAllSetsForUser;
const getCardsBySet = require('../database/queries.js').getCardsBySet;

router.get('/history', (req, res) => {
  const name = req.cookies.name;
  const userId = req.cookies.userId;
  const setIds = [];
  // this is getting all sets associated with the user.
  getAllSetsForUser(userId)
    .then((sets) => {
      console.log('sets for user', sets);
      sets.forEach((set) => {
        setIds.push(set);
      });
      return setIds;
    })
    .then((ids) => {
      ids.forEach((id) => {
        return getCardsBySet(id);
      });
    })
    .then((userSets) => {
      res.render('history', { name, userSets });
    })
    .catch(console.error);
});


module.exports = router;

const router = require('express').Router();
const getAllSetsForUser = require('../database/queries.js').getAllSetsForUser;
const getCardsBySet = require('../database/queries.js').getCardsBySet;


const getUserSets = (req, res, next) => {
  const setArray = [];
  const userId = req.cookies.userId;
  return getAllSetsForUser(userId)
    .then((sets) => {
      sets.forEach((set, index) => {
        setArray.push(
          {
            set: set.set_id,
            cards: [],
          },
        );
      });
      req.setData = setArray;
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
};

const getCards = (req, res, next) => {
  const name = req.cookies.name;
  const setArray = req.setData;
  setArray.forEach((set, index) => {
    return getCardsBySet(set.set)
      .then((cards) => {
        cards.forEach((card) => {
          setArray[index].cards.push(card.name);
        });
        if (index === setArray.length - 1)
          return setArray;
      })
      .then((sets) => {
        if (sets !== undefined) {
          console.log(sets);
          res.render('history', { name, sets });
        }
      })
      .catch(console.error);
  });
};


router.get('/', getUserSets, getCards);

module.exports = router;

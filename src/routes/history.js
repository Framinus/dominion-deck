const router = require('express').Router();
const getAllSetsForUser = require('../database/queries.js').getAllSetsForUser;
const getCardsBySet = require('../database/queries.js').getCardsBySet;
const getAllCardSetsForUser = require('../database/queries.js').getAllCardSetsForUser;

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

// an attempt to solve this all by sql query joins...
const getCards2 = (req, res, next) => {
  const userId = req.cookies.userId;
  return getAllCardSetsForUser(userId)
    .then((data) => {
      console.log(data);
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
};

router.get('/', getUserSets, getCards);

    //     return getCardsBySet(set.set_id)
    //       .then((cards) => {
    //         cards.forEach((card) => {
    //           setArray[index].cards.push(card.name);
    //         });
    //         console.log('setArray', setArray);
    //       });
    //   });
    // })
    // .catch(console.error);

  // return getAllCardSetsForUser(userId)
  //   .then((sets) => {
  //     console.log(sets);
  //     sets.forEach((card) => {
  //
  //     });
  //     res.render('history', { name, sets });
  //   })
  //   .catch(console.error);

// the info i want to grab is all of the cards in each set that the user saved.
// how i want it organized - one row all of the card names in each set_id.

//   return getAllSetsForUser(userId)
//     .then((sets) => {
//       const setIds = [];
//       console.log('sets returned from getAllSetsForUser', sets);
//       sets.forEach((set) => {
//         setIds.push(set.set_id);
//       });
//       console.log('setIds array', setIds);
//       return setIds;
//     })
//     .then((ids) => {
//       ids.forEach((id) => {
//         return getCardsBySet(id)
//           .then((userSet) => {
//             arrayOfSets.push(userSet);
//           })
//       });
//       return arrayOfSets;
//     })
//     .then((userSets) => {
//       res.render('history', userSets);
//     })
//     .catch(console.error);
// });


module.exports = router;

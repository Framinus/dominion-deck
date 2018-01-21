const router = require('express').Router();
const cardsFromSet = require('../database/queries.js').cardsFromSet;
const getCardsByIds = require('../database/queries.js').getCardsByIds;
const randomizer = require('../helpers.js').randomizer;

const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const game = require('./game');
const history = require('./history');

// main page. if the user is logged in, they get the view.
router.get('/', (req, res) => {
  const name = req.session.name;
  if (!name) {
    res.redirect('/signup');
  } else {
    res.render('index', { name });
  }
});

// my frontend is sending the data to the post request as an array with the key of game and the property of an array of the games. that is how the gameArray variable is able to pull the correct information out of req.body.game.
router.post('/', (req, res) => {
  const gameArray = req.body.game;
  console.log(gameArray)
  cardsFromSet(gameArray)
    .then((data) => {
      const cardIds = [];
      data.forEach((card) => {
        cardIds.push(card.card_id);
      });
      return randomizer(cardIds, 10)
    })
    .then((randomCards) => {
      return getCardsByIds(randomCards);
    })
    .then((finalCards) => {
      req.session.finalCards = finalCards;
      res.redirect('/game');
    })
    .catch(console.error);
});

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/game', game);
router.use('/history', history);

module.exports = router;

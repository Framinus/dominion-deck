const router = require('express').Router();
const cardsFromSet = require('../database/queries.js').cardsFromSet;
const getCardsByIds = require('../database/queries.js').getCardsByIds;
const randomizer = require('../helpers.js').randomizer;

const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const game = require('./game');
const history = require('./history');

router.get('/', (req, res) => {
  const name = req.session.name;
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

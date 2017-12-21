const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'dominion',
});

// creates a user in the database.
const createUser = (name, email, password) => {
  return db.one(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [name, email, password]);
};

// this verifies a user upon login.
const verifyUser = (email) => {
  return db.one(
    `SELECT * FROM users WHERE email=$1`, email
  );
};

// this selects cards by dominion game.
const cardsFromSet = (gameArray) => {
  return db.any(`
    SELECT * FROM cards
    WHERE game IN ($1:csv);`, [gameArray])
};


const getAllCardSetsForUser = (userId) => {
  return db.any(`
    SELECT sets.set_id, cards.name
    FROM cards
    JOIN card_set
    ON cards.card_id = card_set.card_id
    JOIN sets
    ON sets.set_id = card_set.set_id
    WHERE sets.user_id=$1
    GROUP BY sets.set_id, cards.name
    ORDER BY sets.set_id;
    `, userId);
};

// i want all sets and the cards inside of them for a single user.
const whatever = (userId) => {
  return db.any()
}

// this gets all cards by their ids. Used in index.js to make a set from randomly generated id numbers.
const getCardsByIds = (idArray) => {
  return db.any(`
    SELECT * FROM cards
    WHERE card_id IN ($1:csv);`, [idArray]);
};

// this gets all cards by gameset id. will need to use this for history.
const getCardsBySet = (setId) => {
  return db.any(
    `SELECT * FROM cards
      JOIN card_set
        ON card_set.card_id = cards.card_id
    WHERE card_set.set_id=$1;`, setId);
};

// this gets all of the game sets for a user.
const getAllSetsForUser = (userId) => {
  return db.any(
    `SELECT sets.set_id FROM sets
      WHERE user_id=$1`, userId);
};

// this saves a game set to the database. used on game page.
const saveCardSet = (setId, cardId) => {
  return db.any(
    `INSERT INTO card_set (set_id, card_id) VALUES ($1, $2) RETURNING *`, [setId, cardId]);
};

// this saves a game set id to the sets table. used on game page.
const saveSet = (userId) => {
  return db.one(`
    INSERT INTO sets (user_id) VALUES ($1) RETURNING *`, userId);
};


module.exports = {
  db, cardsFromSet, createUser, getAllSetsForUser, getAllCardSetsForUser, getCardsByIds, getCardsBySet, saveCardSet, saveSet, verifyUser,
};

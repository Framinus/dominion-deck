const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'dominion',
});

const getCardsByIds = (idArray) => {
  return db.any(`
    SELECT * FROM cards
    WHERE card_id IN ($1:csv);`, [idArray]);
};

const cardsFromSet = (gameArray) => {
  return db.any(`
    SELECT * FROM cards
    WHERE game IN ($1:csv);`, [gameArray])
};

const getCardsBySet = (setId) => {
  return db.any(
    `SELECT * FROM cards
      JOIN card_set
        ON card_set.card_id = cards.card_id
    WHERE card_set.set_id=$1;`, setId);
};

const getAllSetsForUser = (userId) => {
  return db.any(
    `SELECT sets.set_id FROM sets
      WHERE user_id=$1`, userId);
};

const saveCardSet = (setId, cardId) => {
  return db.any(
    `INSERT INTO card_set (set_id, card_id) VALUES ($1, $2) RETURNING *`, [setId, cardId]);
};

const saveSet = (userId) => {
  return db.one(`
    INSERT INTO sets (user_id) VALUES ($1) RETURNING *`, userId);
};


const createUser = (name, email, password) => {
  return db.one(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [name, email, password]);
};

const verifyUser = (email) => {
  return db.one(
    `SELECT * FROM users WHERE email=$1`, email
  );
};

module.exports = {
  db, cardsFromSet, createUser, getAllSetsForUser, getCardsByIds, getCardsBySet, saveCardSet, saveSet, verifyUser,
};

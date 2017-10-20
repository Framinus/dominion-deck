const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'dominion',
});


const cardsFromSet = (gameArray) => {
  return db.any(`
    SELECT * FROM cards
    WHERE game IN ($1:csv);`, [gameArray])
};

const getCardsByIds = (idArray) => {
  return db.any(
    `SELECT * FROM cards
    WHERE card_id IN ($1:csv);`, [idArray]);
};

const createUser = (name, email, password) => {
  return db.one(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [name, email, password])
};

const verifyUser = (email) => {
  return db.one(
    `SELECT * FROM users WHERE email=$1`, email
  );
};

module.exports = {
  db, cardsFromSet, createUser, getCardsByIds, verifyUser,
};

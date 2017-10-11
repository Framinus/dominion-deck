const pgp = require('pg-promise')()

const databaseName = process.env.NODE_ENV === 'test'
                       ? 'cards_test'
                       : 'cards'

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: databaseName,
})

const allCards = () => {
  return db.any("SELECT * FROM cards;")
}

const createCard = ({name, cost, game, attack, power, defense}) => {
  return db.one(`
    INSERT INTO cards (name, cost, game, attack, power, defense)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING cards.id;
    `, {name, cost, game, attack, power, defense})
}

const cardsFromSet = (...games) => {
  return db.any(`
    SELECT * FROM cards
    WHERE game=$1;`, [...games])
}

const createUser = (name, email, password) => {
  return db.one(`
    INSERT INTO users VALUES ($1, $2, $3) RETURNING *
    `, [name, email, password])
}

const verifyUser = (email) => {
  return db.one(
    `SELECT * FROM users WHERE email=$1`, email
  )
}

module.exports = {
  db, allCards, createCard, cardsFromSet, createUser
}

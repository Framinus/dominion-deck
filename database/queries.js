const pgp = require('pg-promise')()

const databaseName = process.env.NODE_ENV === 'test'
                       ? 'cards_test'
                       : 'cards'

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: databaseName,
})

function allCards() {
  return db.any("SELECT * FROM cards;")
}

function createCard({name, cost, game, attack, power, defense}) {
  return db.one(`
    INSERT INTO cards (name, cost, game, attack, power, defense)
    VALUES ($(name), $(cost), $(game), $(attack), $(power), $(defense))
    RETURNING cards.id;
    `, {name, cost, game, attack, power, defense})
}

function getCardById(id) {
  return db.oneOrNone(`
    SELECT * FROM cards
    WHERE id = $1
    `, id)
}

function cardsWithName(name) {
  return db.any(`
    SELECT * FROM cards
    WHERE name = $1;
    `, name)
}

module.exports = {
  db, allCards, createCard, getCardById, cardsWithName
}

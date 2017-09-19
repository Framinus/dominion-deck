CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  game VARCHAR(255),
  attack BOOLEAN,
  powerful BOOLEAN,
  defense BOOLEAN
);

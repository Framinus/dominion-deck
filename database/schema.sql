CREATE TABLE cards (
  card_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  game VARCHAR(255),
  attack BOOLEAN,
  powerful BOOLEAN,
  defense BOOLEAN
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE sets (
  set_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  sets TEXT
);

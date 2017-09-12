const fs = require('fs');

const readFile = function () {
  const cardsObj = JSON.parse(fs.readFileSync('cards.json'));
  return cardsObj;
};


module.exports = readFile;

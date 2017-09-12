const save = require('./../commands/save.js');
const fs = require('fs');


const build = function () {
  // get returned array from addSet.
  const setArray = JSON.parse(fs.readFileSync('./set.JSON'));
  const cardArray = [];
  // call math.floor(math.random) ten times on the array and push results to final array.
  // update - need to stop duplicates without changing original array. 
  while (cardArray.length < 10) {
    const index = Math.floor(Math.random() * (setArray.length - 1));
    cardArray.push(setArray[index]);
  }
  // run the save function from save.js to capture the set.
  // return the array and console log the cards in alpha sort to user.
  console.log(cardArray);
  return cardArray;
};

module.exports = build;

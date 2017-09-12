// this is going to run the addSet function.
const fs = require('fs');
const readFile = require('./../readFile.js');


const addSet = function (sets) {
  // step 1 - read the cards.json file. (maybe set up a readfile.js?)
  const setObj = readFile();
  const setArray = [];
  for (let i = 0; i < setObj.length; i += 1) {
    for (let j = 0; j < sets.length; j += 1) {
      if (setObj[i].set === sets[j]) {
        setArray.push(setObj[i]);
      }
    }
  }
  console.log(`You added cards from ${sets}:`);

  fs.writeFileSync('./set.json', JSON.stringify(setArray));

  return setArray;
};

module.exports = addSet;

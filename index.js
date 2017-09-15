#!/usr/bin/env node

const fs = require('fs');

const addSet = require('./commands/addSet.js');
// I will develop these features later:
// const addAttack = require('./commands/addAttack.js');
// const addPower = require('./commands/addPower.js');
// const addDefense = require('./commands/addDefense.js');
const build = require('./commands/build.js');

const command = process.argv[2];
const setsToAdd = process.argv.slice(3);
const defaultData = [];
let results;

if (command === 'addSet') {
  fs.readFile('./cards.json', 'utf-8', (err, data) => {
    if (err) throw new Error('cannot read file');
    const cards = JSON.parse(data);
    results = addSet(cards, setsToAdd);
    fs.writeFile('./set.json', JSON.stringify(results), (error) => {
      if (error) throw new Error('i cannot write!');
    });
  });
} else if (command === 'build') {
  fs.readFile('./set.json', 'utf-8', (err, data) => {
    if (err) throw new Error('cannot read set.json file');
    const setCards = JSON.parse(data);
    const resultsToSave = build(setCards);
    fs.writeFile('./savedGames.json', JSON.stringify(resultsToSave), (error) => {
      if (error) throw new Error('cannot write to savedGames file!');
    });
  });
}

//   case 'build':
//   {
//     results = build(cards);
//     break;
//   }
//   default:
//   {
//     console.log('need a command');
//   }
// }

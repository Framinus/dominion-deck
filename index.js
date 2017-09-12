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

switch (command) {
  case 'addSet':
  {
    addSet(setsToAdd);
    break;
  }
  case 'build':
  {
    build();
    break;
  }
  default:
  {
    console.log('need a command');
  }
}

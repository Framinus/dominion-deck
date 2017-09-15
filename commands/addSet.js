
const addSet = function (data, sets) {
  const setArray = [];
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data.length; j += 1) {
      if (data[i].set === sets[j]) {
        setArray.push(data[i]);
      }
    }
  }
  console.log(`You added cards from ${sets}:`);
  return setArray;
};

module.exports = addSet;

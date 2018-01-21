const randomizer = (ids, num) => {
  const randomCards = [];
  while (randomCards.length < num) {
    const randomCardIndex = Math.floor(Math.random() * (ids.length - 1));
    if (!randomCards.includes(ids[randomCardIndex])) {
      randomCards.push(ids[randomCardIndex]);
    }
  }
  return randomCards;
}

module.exports = { randomizer };

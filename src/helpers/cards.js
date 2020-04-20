const cards = [
  { name: 'Ace', value: 1 },
  { name: 'Two', value: 2 },
  { name: 'Three', value: 3 },
  { name: 'Four', value: 4 },
  { name: 'Five', value: 5 },
  { name: 'Six', value: 6 },
  { name: 'Seven', value: 7 },
  { name: 'Eight', value: 8 },
  { name: 'Nine', value: 9 },
  { name: 'Ten', value: 10 },
  { name: 'Jack', value: 10 },
  { name: 'Queen', value: 10 },
  { name: 'King', value: 10 },
];
const random = (start, end) => Math.floor(Math.random() * end) + start;
module.exports = {
  cards,
  randomCard: () => cards[random(0, cards.length - 1)],
  sumCard: (deck) =>
    deck.map((card) => (deck.length < 3 && card.name == 'Ace' ? 11 : card.value)).reduce((a, b) => a + b, 0),
  random,
};

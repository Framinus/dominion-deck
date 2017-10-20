# Dominion Deck

This is a custom deck randomizer program for the game Dominion. While there are other great deck builder sites for this game, I wanted one that could include parameters that my family and I use when building our own games, such as the inclusion of "Power Cards" (like "Pirate Ship", "Treasure Map", and "Goons") and of cost equity. I will build the basic deck building interface and then develop ways to sort for these categories.

### Developed features:

- Built database to store cards and users.
- Authentication for users
- Pug templates for these pages:
  - Signup/login
  - Main page
- Algorithm for selecting ten random cards from the possible options.

### Core features to develop:

- Build feature that allows user to remove a card from the set and select a new random card that fits the checkbox parameters.
- Change card selection results from a new page render to an ajax request.
- Build out search history functionality, including a button below a rendered set that allows a user to save a set.
- Pug template for:
  - Search History

### Bonus features:

- Allow user to select options other than game choice to determine sets:
  - number of attack cards
  - number of powerful cards (subjective, but it's my deckbuilder!)
  - cost distribution

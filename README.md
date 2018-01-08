# Dominion Deck

This is a custom deck randomizer program for the game Dominion. While there are other great deck builder sites for this game, I wanted to create one that allowed users to reject a card or two without having to re-draw for a whole new set, and also allowed users to save sets, leave comments, and view their own search history over time. My family plays this game quite frequently and owns most of the expansions, so we are always looking for great new game combinations!

### Developed features:

- All cards for every Dominion expansion (excluding Nocturne) are included in the database.
- Users can log in and view their own search history. 
- Users can select any number of Dominion expansions and get a randomized set of ten decks to use for their game, and choose to save those sets to their history.

### Core features to develop:

- Allow users to delete cards from rendered sets that they don't want to play with, and re-run the search algorithm to replace only those cards. (So if the user liked 7 of the 10 rendered cards, they could click on the 3 unwanted cards to delete them, and click a button to rerun the algorithm for 3 cards.) 
- Search histories can be edited with added comments about the game after the user has played it.
- User can see not only their own search history, but saved games by all users with comments.

### Bonus features:

- Allow user to select options other than game choice to determine sets:
  - number of attack cards
  - number of powerful cards (subjective, but it's my deckbuilder!)
  - cost distribution
  
### Frameworks used, now and future:

Currently, this site is built in Node and Express, with Pug templating, a PostgreSQL database, and a little frontend JavaScript.

I have discovered the magic of React, so the structure of this site will be changing to a RESTful API on the backend (still built with Node, Express and Postgres) and React on the frontend. Stay tuned!

### Instructions

If you want to play with the code in its current state:

- Fork and clone the repository. 
- Run NPM install to get the required packages.
- ```npm run db:create```, ```npm run db:schema``` and ```npm run db:data``` to create the database, load the schema, and seed the database. Card data is in a .csv file. 

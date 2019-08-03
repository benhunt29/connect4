This is a playable 6x6 implementation of Connect4. The app is hosted on heroku [here](http://bhunt-drop-token.herokuapp.com/).
The computer is not very good, I just wanted to demonstrate integration with an external service (https://github.com/benhunt29/connect4lambda).

To build it locally, do the follwing steps:

1. Clone the repo and install node if not already installed
2. Run `npm install` (or `yarn install` if you have yarn)
3. Run `npm start` (or `yarn start`) to launch a local dev server
4. Run `npm test` (or `yarn test`) to run the tests

### Notes

This is a work-in-progress. Things to do:

1. Add more tests.
2. Allow for color choice.
3. Keep track of game history.
4. Add some animations.

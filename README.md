This is a playable 4x4 implementation of Connect4. The app is hosted on heroku [here](https://bhunt-drop-token.herokuapp.com/). To build it locally, do the follwing steps:

1. Clone the repo and install node if not already installed
2. Run `npm install` (or `yarn install` if you have yarn)
3. Run `npm start` (or `yarn start`) to launch a local dev server
4. Run `npm test` (or `yarn test`) to run the tests


### Notes

1. There are minimal tests. In a real implementation, I'd write a bunch of tests for the components and the redux actions/reducers/selectors. Here I opted to just test what I felt was most important (the grid logic).
2. Currently there's no way to view a grid after the game is over, it'd probably make sense to add a "start new game" button outside of a modal.
3. I added a delay to the "computer response" to simulate "thinking". It feels a *little* more like you're playing a real person
4. Instead of throwing an error when the player attempts to place a token in a filled column, I don't allow them to do that. I feel like it's a better user experience.
5. The logic to check row/column/diagonal winners could probably be collapsed into a single function somehow. I didn't feel like it was worth it to spend the time making it into a single function. It also seems a bit more understandable when they're separated. 

const express = require('express');
const app = express();
const PORT = 5001;

// This must be added before GET & POST routes.
app.use(express.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// let guess = { player1: '', player2: '' };
let results = [];

// GET & POST Routes go here
app.get('/guess', (req, res) => {
  console.log('get fired!');
  res.send(results);
});

app.post('/guess', (req, res) => {
  console.log('post fired');
  // req.body should be {player1: '1', player2: '2'}
  let playerGuess = req.body;
  console.log('playerGuess', playerGuess);

  //check player guess against a random number
  let randomNumber = 5; //hard coded for test

  //newObj to get player results
  let playerResult = { ...playerGuess };
  // handle player1
  if (Number(playerGuess.player1) === randomNumber) {
    //player wins!
    playerResult.player1_result = 'Winner';
  }
  if (Number(playerGuess.player1) > randomNumber) {
    // too high
    playerResult.player1_result = 'Too High';
  }
  if (Number(playerGuess.player1) < randomNumber) {
    // too low
    playerResult.player1_result = 'Too Low';
  }

  // handle player2
  if (Number(playerGuess.player2) === randomNumber) {
    //player wins!
    playerResult.player2_result = 'Winner';
  }
  if (Number(playerGuess.player2) > randomNumber) {
    // too high
    playerResult.player2_result = 'Too High';
  }
  if (Number(playerGuess.player2) < randomNumber) {
    // too low
    playerResult.player2_result = 'Too Low';
  }

  results.push(playerResult);

  res.sendStatus(201);
});

app.post('/new_game', (req, res) => {
  console.log('new game fired');
  //req.body will be {}
  results.length = 0;
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

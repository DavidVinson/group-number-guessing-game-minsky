function onReady() {
  console.log('JavaScript is loaded!');
  fetchGuess();
}

function postGuess(event) {
  event.preventDefault();
  console.log('post guess fired');

  //player guessess
  let player1Guess = document.getElementById('player-1').value;
  let player2Guess = document.getElementById('player-2').value;

  let playerGuess = {
    player1: player1Guess,
    player2: player2Guess,
  };

  // axios post to server

  axios
    .post('/guess', playerGuess)
    .then((response) => {
      // call fetchGuess to display
      fetchGuess();
    })
    .catch((error) => console.error('error in post', error));
}

function fetchGuess() {
  console.log('get guesses');
  // axios get to server
  axios
    .get('/guess')
    .then((response) => {
      let playerData = response.data;
      console.log('guess to display', playerData);
      //display on DOM
      let guessList = document.getElementById('guess-list');
      guessList.innerHTML = '';
      console.log('guessList', guessList);

      //winner
      let winner = document.getElementById('game-winner');
      winner.innerHTML = '';
      console.log('winner', winner);

      playerData.forEach((element) => {
        console.log('element', element);
        if (element.player1_result === 'Winner' || element.player2_result === 'Winner') {
          winner.innerHTML = `${element.player1_result === 'Winner' ? element.player1 : element.player2}`;
        }
        guessList.innerHTML += `
        <li>player1: guess ${element.player1} score: ${element.player1_result}</li>
        <li>player2: guess ${element.player2} score: ${element.player2_result}</li>
        <hr/>
        `;
      });
      // playerData.forEach(
      //   (round) =>
      //     (guessList += `
      // <li>
      //   player1: ${round.player1} -- score: ${round.player1_result}
      //   player2: ${round.player2} -- score: ${round.player2_result}
      // </li>`)
      // );
    })
    .catch((error) => console.error('Error in fetching gueses', error));
}

onReady();

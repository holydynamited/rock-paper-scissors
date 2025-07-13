let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};



updateScoreValue();

const emoji = {
  rock: '✊',
  paper: '🖐',
  scissors: '✌'
};

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(function () {
    const playerMove = pickComputerMove();
    playGame(playerMove);
    }, 1000)
    isAutoPlay = true;
  }
  else {
    clearInterval(intervalId);
    autoPlay = false;
  }
 
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    result = computerMove === 'rock' ? 'You lose.'
      : computerMove === 'paper' ? 'You win.'
        : 'Tie.';
  } else if (playerMove === 'paper') {
    result = computerMove === 'rock' ? 'You win.'
      : computerMove === 'paper' ? 'Tie.'
        : 'You lose.';
  } else if (playerMove === 'rock') {
    result = computerMove === 'rock' ? 'Tie.'
      : computerMove === 'paper' ? 'You lose.'
        : 'You win.';
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  showMove(playerMove, computerMove);
  showResult(result);
  updateScoreValue();

}

function updateScoreValue() {
  document.querySelector('.js-score').innerHTML = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function showMove(p, c) {
  
  document.querySelector('.js-move').innerHTML =
    `You ${emoji[p]} - ${emoji[c]} Computer`

}



function showResult(res) {
  
  document.querySelector('.js-result').innerHTML = res;

}





function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  
  
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) return 'rock';
  else if (randomNumber < 2 / 3) return 'paper';
  else return 'scissors';
}

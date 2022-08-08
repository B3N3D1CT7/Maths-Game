//Made by Benedict
const intro = document.querySelector('.intro-container');
const introForm = document.getElementById('intro-form');
const btnStart = document.querySelector('.btn-start');
const showIcon = document.querySelector('.angle');
const para = document.getElementById('maths');
const gameBtn = document.getElementById('submit');
const answer = document.getElementById('answer');
const highScore = document.querySelector('.high-score span');
const mainScore = document.querySelector('.main-score span');
const comment = document.getElementById('comment');
const time = document.querySelector('.main-time');
const newGameBtn = document.getElementById('new-game');
const preLoader = document.querySelector('.preloader');
const percent = document.querySelector('.percent span');
const container = document.querySelector('.intro-container');
const gameContainer = document.querySelector('.game-container');
const playerName = document.getElementById('player-name');
const nameInput = document.getElementById('name');
const header = document.querySelector('header');

const scores = [0];
let highestScore;
let currentScore;

showIcon.addEventListener('click', displayForm);

function displayForm() {
  introForm.style.maxHeight = `100rem`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnStart.addEventListener('click', displayGame);

function displayGame() {
  container.style.left = '-100%';
  setTimeout(() => {
    preLoader.style.display = 'block';
    increasePercent();
  }, 1000)
  setTimeout(() => {
    header.style.display = 'none';
    preLoader.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 6000)
  setTimeout(() => game(), 7000);
  
}


function randomValue(array) {
  let random = Math.floor(Math.random() * array.length);
  return array[random];
}

let isPlaying = true;
let firstNum = random(0, 110);
let secondNum = random(0, 110);
let results;
let mainResult;
let timeCount = 15;
let score = 0;


function startMaths() {
  answer.disabled = false;
  gameBtn.disabled = false;
  answer.focus();
  let result1 = firstNum + secondNum;
  let result2 = firstNum - secondNum;
  
  results = [result1, result2];
  mainResult = randomValue(results)
  
  if (mainResult === result1) {
    para.textContent = `${firstNum} + ${secondNum}`;
  } else {
    para.textContent = `${firstNum} - ${secondNum}`;
  }
}

function game() {
  startMaths();
  timeCheck();
  time.textContent = timeCount;
  mainScore.textContent = score;
  highScore.textContent = highestScore;
  playerName.textContent = nameInput.value;
}

function checkAnswer() {
  let userInput = Number(answer.value);
  if (userInput !== mainResult) {
    comment.textContent = 'Wrong!';
    comment.style.color = `red`;
    answer.value = '';
  } else {
    score++;
    mainScore.textContent = score;
    comment.textContent = 'Correct!';
    setTimeout(() => {
      comment.textContent = '';
    }, 2000)
    comment.style.color = `#6ED498`;
    setTimeout(() => {
      para.textContent = 'next...';
      answer.value = '';
      answer.focus();
    }, 300)
    setTimeout(() => {
      timeCount = 15;
      time.classList.remove('active');
      if (timeCount > 5) {
        time.style.color = `#48ADE9`;
      } else {
        time.classList.add('active');
      }
      time.textContent = timeCount;
      firstNum = random(0, 110);
      secondNum = random(0, 110);
      startMaths();
      
    }, 1500)
  }
  answer.focus();
}

gameBtn.addEventListener('click', checkAnswer);

function timeCheck() {
  setInterval(() => {
    if (timeCount > 0) {
      timeCount--;
    }
    if (timeCount === 0) {
      setGameOver();
    } else {
      answer.disabled = false;
      gameBtn.disabled = false;
      time.classList.remove('active');
      time.textContent = timeCount;
      answer.placeholder = '';
      time.style.animation = `resize 1s cubic-bezier(0.19, 1, 0.22, 1) infinite`;
      newGameBtn.style.display = 'none';
    }
    
    if (timeCount < 6) {
      time.style.color = `red`;
    }
    
    if (timeCount === 0) {
      
    }
    
  }, 1000)
  
}

function setGameOver() {
  currentScore = score;
  scores.push(currentScore);
  highestScore = Math.max(...scores);
  highScore.textContent = highestScore;
  time.textContent = 'Time Out!';
  time.classList.add('active');
  answer.disabled = true;
  isPlaying = false;
  gameBtn.disabled = true;
  answer.value = '';
  answer.placeholder = 'Start new game..';
  comment.style.color = `#111`;
  comment.textContent = `Answer is ${mainResult}`;
  setTimeout(() => {
    time.style.animation = 'none';
  }, 800)
  newGameBtn.style.display = 'block';
}

newGameBtn.addEventListener('click', resetGame);

function resetGame() {
  timeCount = 15;
  score = 0;
  mainScore.textContent = score;
  highScore.textContent = highestScore;
  comment.textContent = '';
  time.classList.remove('active');
  if (timeCount > 5) {
    time.style.color = `#48ADE9`;
  } else {
    time.classList.add('active');
  }
  time.textContent = timeCount;
  firstNum = random(0, 110);
  secondNum = random(0, 110);
  startMaths();
}

let percentage = 0;
function increasePercent() {
  setInterval(() => {
    if (percentage < 100) {
      percentage++;
    }
    percent.textContent = percentage;
  }, 40)
}

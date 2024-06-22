let lives = 3;
let points = 0;
let gameTime = 60; // 1 minute
let isGameStarted = false;
let isGamePaused = false;
let canvas;
let ctx;
let playerDesktop;

// Game elements
let startScreen = document.getElementById('start-screen');
let gameScreen = document.getElementById('game-screen');
let endScreen = document.getElementById('end-screen');
let livesElement = document.getElementById('lives');
let pointsElement = document.getElementById('points');
let timeElement = document.getElementById('time');
let pauseButton = document.getElementById('pause-button');

// Start screen elements
let startButton = document.getElementById('start-button');
let desktopSelect = document.getElementById('desktop-select');

// Game logic
function startGame() {
  isGameStarted = true;
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  playerDesktop = desktopSelect.value;
  updateGameScreen();
  countdownTimer();
  drawGame();
}

function updateGameScreen() {
  livesElement.textContent = `Lives: ${lives}`;
  pointsElement.textContent = `Points: ${points}`;
  timeElement.textContent = `Time: ${gameTime} seconds`;
}

function countdownTimer() {
  if (!isGamePaused) {
    gameTime--;
    updateGameScreen();
    if (gameTime <= 0) {
      endGame();
    } else {
      setTimeout(countdownTimer, 1000);
    }
  }
}

function pauseGame() {
  isGamePaused =!isGamePaused;
  if (isGamePaused) {
    pauseButton.textContent = 'Resume';
  } else {
    pauseButton.textContent = 'Pause';
    countdownTimer();
  }
}

function endGame() {
  isGameStarted = false;
  gameScreen.style.display = 'none';
  endScreen.style.display = 'block';
  document.getElementById('end-points').textContent = `You earned ${points} points!`;
  // Transfer points to user's Personal Account
  transferPoints(points);
}

function transferPoints(points) {
  // TO DO: Implement API call to transfer points to user's Personal Account
  console.log(`Transferring ${points} points to user's Personal Account...`);
}

function drawGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the game elements
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Lives: ${lives}`, 10, 10);
  ctx.fillText(`Points: ${points}`, 10, 30);
  ctx.fillText(`Time: ${gameTime} seconds`, 10, 50);
  
  // Draw the player's desktop background
  ctx.fillStyle = playerDesktop === 'desktop-1'? 'blue' : playerDesktop === 'desktop-2'? 'green' : 'ed';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw the game objects (e.g. enemies, player ship, etc.)
  // TO DO: Implement game object drawing logic
  
  // Update the game state
  // TO DO: Implement game state update logic
  
  // Request the next frame
  requestAnimationFrame(drawGame);
}

// Event listeners
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
desktopSelect.addEventListener('change', () => {
  // TO DO: Implement desktop selection logic
  console.log(`Desktop selected: ${desktopSelect.value}`);
});
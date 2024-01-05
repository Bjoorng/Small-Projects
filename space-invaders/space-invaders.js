let tileSize = 48;
let rows = 16;
let cols = 24;

let board;
let bWidth = tileSize * cols;
let bHeight = tileSize * rows;
let context;

let sWidth = tileSize * 2;
let sHeight = tileSize;
let sX = tileSize * cols/ 2 - tileSize;
let sY = tileSize * rows - tileSize * 2;

let ship = {
  x: sX,
  y: sY,
  width: sWidth,
  height: sHeight,
};

let shipPic;
let shipSpeed = tileSize;

let aliens = [];
let aWidth = tileSize * 2;
let aHeight = tileSize;
let aX = tileSize;
let aY = tileSize;
let alienPic;

let aRows = 2;
let aCols = 3;
let aCount = 0;
let alienSpeed = 1;

let bullets = [];
let bulletSpeed = -10;

let score = 0;
let inProgress = false;
let gO = true;

let startBtn = document.querySelector(".start");

function startGame() {
  score = 0;
  gO = false;
  ship.x = sX;
  ship.y = sY;
  aCols = 3;
  aRows = 2;
  alienSpeed = 1;
  bulletSpeed = -10;
  inProgress = true;

  aliens = [];
  bullets = [];

  createAliens();

  requestAnimationFrame(update);

  startBtn.classList.add("d-none");

  console.log(alienSpeed)
}

function displayTopScores(topScores) {
  topScores.sort((a, b) => b - a);

  context.fillStyle = "white";
  context.font = "18px Arial";

  for (let i = 0; i < Math.min(topScores.length, 5); i++) {
    const scoreText = `Top ${i + 1}: ${topScores[i]}`;
    context.fillText(scoreText, bWidth - 150, 20 + i * 20);
  }
}


window.onload = function() {
  board = document.querySelector("#board");
  board.width = bWidth;
  board.height = bHeight;
  context = board.getContext("2d");

  shipPic = new Image();
  shipPic.src = "./assets/ship.png";
  shipPic.onload = function () {
    context.drawImage(shipPic, ship.x, ship.y, ship.width, ship.height);
  };

  alienPic = new Image();
  alienPic.src = "./assets/alien-cyan.png";
  createAliens();

  requestAnimationFrame(update);
  document.addEventListener("keydown", move);
  document.addEventListener("keydown", shots);
};

function update() {
  requestAnimationFrame(update);
  if (gO || !inProgress) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  context.drawImage(shipPic, ship.x, ship.y, ship.width, ship.height);
  
  for (let i = 0; i < aliens.length; i++) {
    let alien = aliens[i];
    if (alien.alive) {
      alien.x += alienSpeed;
      if (alien.x + alien.width >= board.width || alien.x <= 0) {
        alienSpeed *= -1;
        alien.x += alienSpeed * 2;
        for (let j = 0; j < aliens.length; j++) {
          aliens[j].y += aHeight;
        }
      }
      context.drawImage(alienPic, alien.x, alien.y, alien.width, alien.height);
      if (alien.y >= ship.y) {
        gO = true;
        inProgress = false;
        startBtn.classList.remove("d-none");
        context.clearRect(0, 0, board.width, board.height);
        context.fillStyle="white";
        context.text="56px, Arial";
        context.fillText("Game Over", tileSize * cols/ 2 - tileSize*3.5, tileSize * rows/ 2);
        context.fillText(score, tileSize * cols/ 2, tileSize * rows/ 2 + tileSize*2)
      }
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.y += bulletSpeed;
    context.fillStyle = "white";
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    for (let j = 0; j < aliens.length; j++) {
      let alien = aliens[j];
      if (!bullet.used && alien.alive && collisions(bullet, alien)) {
        bullet.used = true;
        alien.alive = false;
        aCount--;
        score += 100;
      }
    }
  }

  while (bullets.length > 0 && (bullets[0].used || bullets[0] < 0)) {
    bullets.shift();
  }

  if (aCount == 0) {
    score += aCols * aRows * 100;
    aCols = Math.min(aCols + 1, cols / 2 - 2);
    aRows = Math.min(aRows + 1, rows - 4);
    if (inProgress) {
      alienSpeed += (alienSpeed > 0) ? 0.2 : -0.2;
    }

    aliens = [];
    bullets = [];
    createAliens();
  }
  context.fillStyle = "white";
  context.font = "32px Arial";
  context.fillText(score, 10, 36);
}

function move(e) {
  if (gO || !inProgress) {
    return;
  }

  if (e.code == "ArrowLeft" && ship.x - shipSpeed >= 0) {
    ship.x -= shipSpeed;
  }
  if (e.code == "ArrowRight" && ship.x + shipSpeed + ship.width <= board.width) {
    ship.x += shipSpeed;
  }
}

function createAliens() {
  for (let a = 0; a < aCols; a++) {
    for (let l = 0; l < aRows; l++) {
      let alien = {
        pic: alienPic,
        x: aX + a * aWidth,
        y: aY + l * aHeight,
        width: aWidth,
        height: aHeight,
        alive: true,
      };
      aliens.push(alien);
    }
  }
  aCount = aliens.length;
}

function shots(e) {
  if (gO || !inProgress) {
    return;
  }
  if (e.code == "Space") {
    let bullet = {
      x: ship.x + ship.width * 15 / 32,
      y: ship.y,
      width: tileSize / 8,
      height: tileSize / 2,
      used: false,
    };
    bullets.push(bullet);
  }
}

function collisions(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

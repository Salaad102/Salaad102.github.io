// Random Grid using arrays
// Salaar Ahmed
// Oct. 26, 2022

let state = "startScreen";
const ROWS = 12;
const COLS = 24;
let roadStrips = [];
let velocity = 0.6;
let grid;
let cellWidth;
let cellHeight;
let playerX = 11;
let playerY = 7;
let roadImg1, grassimg, playerimg;

function preload() {
  roadImg1 = loadImage("road.png");
  grassimg = loadImage("grass.png");
  playerimg = loadImage("duck.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  //place player in grid
  grid[playerY][playerX] = 9;
  createObst();
}

function draw() {
  background(220);
  displayGrid(grid);
  startRoadStrips();
}

let roadstrips = [], px = 200, py = 400, score = 0, playing = true;


function createObst(){
  for (let i = 14; i >= -1; i--) {
    let someArray = [];
    for (let j = 0; j < 10; j++) {
      someArray.push(0);
    }
    roadstrips.push({
      y: i * 40,
      strip: someArray
    });
  }
}

function startRoadStrips() {
  if (playing){
    background(220);
    noStroke();
    for (let i = 0; i < roadstrips.length; i++) {
      for (let j = 0; j < 10; j++) {
        if (roadstrips[i].strip[j] === 0) {
          fill(255);
        }
        if (roadstrips[i].strip[j] === 1) {
          fill(130);
        }
        if (roadstrips[i].strip[j] === 2) {
          fill(0); // roadstrip img
        }
        rect(j * 40, roadstrips[i].y, 40, 40);
      }
      roadstrips[i].y += velocity;
    }
    fill(255,0,0);
    ellipse(px+20,py+20,30,30);
    py+=velocity;
    if (roadstrips[0].y > height){
      generateStrip();
      score+=0.2;
    }
    fill(0);
    text(Math.floor(score), 30,30);
    velocity = 0.47*frameCount/1000 + 100/py;
    if(py<height) {
      playing = false;
    }
    else{
      background(255, 0,0);
      textAlign(CENTER);
      fill(255);
      text("RETRY",width/2, height/2);
    }
  }
}

function generateStrip() {
  let r = Math.floor(random(3));
  console.log(r);
  let a = [];
  if (r === 0) {
    for (let i = 0; i < 10; i++) {
      if (random(2) < 1) {
        a.push(0);
      }
      else {
        a.push(2);
      }
    }
  }
  if (r === 1) {
    for (let i = 0; i < 10; i++) {
      if (random(5) < 1) {
        a.push(1);
      }
      else {
        a.push(0);
      } 
    }
  }
  if (r === 2) {
    for (let i = 0; i < 10; i++) {
      if (random(5) < 1){
        a.push(2);
      } 
      else {
        a.push(0);
      }
    }
  }
  let last=roadstrips[roadstrips.length-1].y-40;
  roadstrips.push({
    y:last,
    strip: a
  });
  roadstrips.shift();
}


// function mouseClicked(){
//   if(!playing){
//     setup();
//   }
// }

// if(keyCode === UP_ARROW){
//   if(roadstrips[roadstrips.length-Math.floor(py/40)-1].strip[Math.floor(px/40)]===0 && py>40) {
//     py -= 40;
//   }
// }
// if(keyCode === DOWN_ARROW){
//   if(roadstrips[roadstrips.length-Math.floor(py/40)-3].strip[Math.floor(px/40)]===0 && py>40) {
//     py += 40;
//   }
// }
// if(keyCode === RIGHT_ARROW){
//   if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)+1]===0 && px<width-40){
//     px += 40;
//   }
// }
// if(keyCode === LEFT_ARROW){
//   if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)-1]===0 && px>=40){
//     px -= 40;
//   }
// }


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (grid[playerY][playerX+1] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerX++;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === LEFT_ARROW) {
    if (grid[playerY][playerX-1] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerX--;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === UP_ARROW) {
    if (grid[playerY-1][playerX] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerY--;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (grid[playerY+1][playerX] === 0) {
      //reset old location to white
      grid[playerY][playerX] = 0;
      
      //move
      playerY++;

      //set new player location
      grid[playerY][playerX] = 9;
    }
  }
}

function mousePressed() {
  let xPos = Math.floor(mouseX/cellWidth);
  let yPos = Math.floor(mouseY/cellHeight);

  if (grid[yPos][xPos] === 0) {
    grid[yPos][xPos] = 1;
  }
  else if (grid[yPos][xPos] === 1) {
    grid[yPos][xPos] = 0;
  }
}

function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        // fill("white");
        image(grassimg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 1) {
        image(roadImg1, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        // fill("red");
        image(playerimg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        
      }
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function createRandom2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

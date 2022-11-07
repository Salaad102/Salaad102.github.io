// Crossy ROAD
// Salaar Ahmed
// Nov. 2, 2022
//
// Extra for Experts:
//
// Sources:
// https://opengameart.org/content/wall-grass-rock-stone-wood-and-dirt-480

const ROWS = 10;
const COLS = 20;
let grid;
let cellWidth;
let cellHeight;
let state = "startScreen";
let grassImg, roadImg1, animal;
let player = {
  posY: 0,
  posX: 0,
};

function preload() {
  grassImg = loadImage("grass.png");
  roadImg1 = loadImage("Road.png");
  animal = loadImage("duck.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
  //crossy road player
  grid[player.posY][player.posX] = 9;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (grid[player.posY][player.posX+1] === 0) {
      //reset old location to white
      grid[player.posY][player.posX] = 0;
      
      //move
      player.posX++;

      //set new player location
      grid[player.posY][player.posX] = 9;
    }
  }

  if (keyCode === LEFT_ARROW) {
    if (grid[player.posY][player.posX-1] === 0) {
      //reset old location to white
      grid[player.posY][player.posX] = 0;
      
      //move
      player.posX--;

      //set new player location
      grid[player.posY][player.posX] = 9;
    }
  }

  if (keyCode === UP_ARROW) {
    if (grid[player.posY-1][player.posX] === 0) {
      //reset old location to white
      grid[player.posY][player.posX] = 0;
      
      //move
      player.posY--;

      //set new player location
      grid[player.posY][player.posX] = 9;
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (grid[player.posY+1][player.posX] === 0) {
      //reset old location to white
      grid[player.posY][player.posX] = 0;
      
      //move
      player.posY++;

      //set new player location
      grid[player.posY][player.posX] = 9;
    }
  }
}

function draw() {
  background(220);
  create2dArray();
  displayGrid(grid);
}

function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 1){
        image(roadImg1,x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        circle(x*cellWidth - cellWidth/2, y*cellHeight - cellHeight/2, cellWidth); 
      }
      else if (grid[y][x] === 9){
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        image(animal, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++){
    emptyArray.push([]);
    for (let x=0; x<COLS; x++){
      emptyArray[y].push(0);
      if (random(100) < 50) {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}


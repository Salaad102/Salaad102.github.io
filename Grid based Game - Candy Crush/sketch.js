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
let player = {
  posY: 0,
  posX: 0,

};


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellHeight = height/ROWS;
  cellWidth = width/COLS;
  grid = create2dArray(COLS, ROWS);
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
        fill("white");
      }
      else if (grid[y][x] === 1){
        //circle(x*cellWidth - cellWidth/2, y*cellHeight - cellHeight/2, cellWidth); 
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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


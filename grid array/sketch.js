// Basic Grid Demo
// Salaar Ahmed
// Oct. 25, 2022

let grid = [[0,0,1,1,0],
            [1,0,1,0,1],
            [0,1,0,1,1],
            [1,0,1,0,1],
            [0,0,0,1,0]];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid(grid);
  
}

function mousePressed(){
  let cellWidth = width / grid[0].length;
  let cellHeight = height / grid.length;

  let x = Math.floor(mouseX/cellWidth);
  let y = Math.floor(mouseY/cellHeight);
  console.log(y);
  console.log(x);
  if (grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1){
    grid[y][x] = 0;
  }
}

function displayGrid(grid){
  let cellWidth = width / grid[0].length;
  let cellHeight = height / grid.length;
  for (let y=0; y<grid.length; y++){
    for (let x=0; x<grid[y].length; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1){
        fill("black");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

// function mousePressed(){

//   let cellWidth = width / grid[0].length;
//   let cellHeight = height / grid.length;
//   let squareValueX = floor(mouseX / cellWidth);
//   let squareValueY = floor(mouseY / cellHeight);
//   if (squareValueX)
// }

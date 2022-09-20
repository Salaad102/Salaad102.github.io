// Chessboard
// Salaar Ahmed
// Sept.sd 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawChessboard();
}

function drawChessboard() {
  let cellWidth = width/8;
  let cellHeight = height/8;
  if (cellHeight > cellWidth) {
    cellWidth = cellHeight;
  }
  else {
    cellHeight = cellWidth;
  }

  let isWhite = true;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (isWhite) {
        fill("white");
      }
      else {
        fill("black")
      }
      
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight)
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }

}

function windowResized() {
  setup();
}
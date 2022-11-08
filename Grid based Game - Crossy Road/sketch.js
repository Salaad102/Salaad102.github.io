// Crossy ROAD
// Salaar Ahmed
// Nov. 2, 2022
//
// Extra for Experts:
//
// Sources:
// https://opengameart.org/content/wall-grass-rock-stone-wood-and-dirt-480

const ROWS = 12;
const COLS = 24;
let roadstrips = [];
let velocity = 0;
let grid;
let cellWidth;
let cellHeight;
let state = "startScreen";
let grassImg, roadImg1, animal;
let playerX = 11;
let playerY = 7;

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
  grid[playerY][playerX] = 9;
}

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
    
    }
    return emptyArray;
  }
}

// let roadstrips = [], velocity = 0.6, px = 200, py = 400, score = 0, playing = true;

// function setup() {
//   createCanvas(400, 600);
//   createObst();
// }

// function createObst(){
//   for (let i = 14; i >= -1; i--) {
//   someArray = []
//     for (let j = 0; j < 10; j++) {
//       someArray.push(0)
//     }
//   roadstrips.push({
//     y: i * 40,
//     strip: someArray
//   })
// }
// }

// function draw() {
//   if (playing){
//     background(220);
//   	noStroke()
//   	for (i = 0; i < roadstrips.length; i++) {
//   		for (j = 0; j < 10; j++) {
//   			if (roadstrips[i].strip[j] === 0) {
//   				fill(255)
//   			}
//   			if (roadstrips[i].strip[j] === 1) {
//   				fill(130)
//   			}
//   			if (roadstrips[i].strip[j] === 2) {
//   				fill(0)
//   			}
//   			rect(j * 40, roadstrips[i].y, 40, 40)
//   		}
//   		roadstrips[i].y += velocity
//   	}
//   	fill(255,0,0)
//   	ellipse(px+20,py+20,30,30);
//   	py+=velocity
//   	if (roadstrips[0].y > height){
//   		generateStrip()
//       score+=0.2
//   	}
//     fill(0)
//     text(Math.floor(score), 30,30)
//   	velocity = 0.47*frameCount/1000 + 100/py
//     if(py>height-40) playing = false
//   }else{
//     background(255, 0,0)
//     textAlign(CENTER)
//     fill(255)
//     text('RETRY',width/2, height/2)
//   }
// }

// function generateStrip() {
// 	r = Math.floor(random(3))
// 	console.log(r)
// 	a = []
// 	if (r == 0) {
// 		for (i = 0; i < 10; i++) {
// 			if (random(2) < 1) a.push(0)
// 			else a.push(2)
// 		}
// 	}
// 	if (r == 1) {
// 		for (i = 0; i < 10; i++) {
// 			if (random(5) < 1) a.push(1)
// 			else a.push(0)
// 		}
// 	}
// 	if (r == 2) {
// 		for (i = 0; i < 10; i++) {
// 			if (random(5) < 1) a.push(2)
// 			else a.push(0)
// 		}
// 	}
// 	last=roadstrips[roadstrips.length-1].y-40
// 	roadstrips.push({
// 		y:last,
// 		strip: a
// 	})
// 	roadstrips.shift()
// }

// function keyPressed() {
// 		if(keyCode == UP_ARROW){
// 			if(roadstrips[roadstrips.length-Math.floor(py/40)-1].strip[Math.floor(px/40)]==0 && py>40) {py -= 40}
// 		}
// 		if(keyCode == DOWN_ARROW){
// 			if(roadstrips[roadstrips.length-Math.floor(py/40)-3].strip[Math.floor(px/40)]==0 && py>40) {py += 40}
// 		}
// 		if(keyCode == RIGHT_ARROW){
// 			if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)+1]==0 && px<width-40){
// 				px += 40
// 			}
// 		}
// 		if(keyCode == LEFT_ARROW){
// 			if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)-1]==0 && px>=40){
// 				px -= 40
// 			}
// 		}
// }

// function mouseClicked(){
//   if(!playing){
//     setup()
//   }
// }
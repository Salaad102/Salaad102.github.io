// Survive the Boxes
// Salaar Ahmed
//
// Extra for Experts:
//  add a start screen

let roadstrips, velocity, px, py, score, playing; // defining variables, not giving them values.
let soundEffect;
let obstacleOne, obstacleTwo, pathBlock;
let gridWidth = 15;
let gridHeight = 19;
let gridCanvasHeight = 800;
let state = "gameMenu";

function preload(){
  soundEffect = loadSound("Movement.mp3.wav");
  obstacleOne = loadImage("metalBox_1.png");
  obstacleTwo = loadImage("WoodCrate.png");
  pathBlock = loadImage("roadTexture_38.png");
}

function determineValues() {
  roadstrips = [];
  velocity = 0.5;
  px = 280; // Starting x position  of the player, increaments of 40
  py = 400; // Starting y position of the player, icreaments of 40
  score = 0;
  playing = true;
}

function setup() {
  determineValues();
  createCanvas(600, 800);
  create2dGrid();
}

function create2dGrid() {
  for (let i = gridHeight; i >= -1; i--) {
    let a = [];
    for (let j = 0; j < gridWidth; j++) {
      a.push(0);
    }
    roadstrips.push({
      y: i * 40,
      strip: a 
    });
  }
}

function draw() {
  if (playing){
    displayRoadStrips();
    fill(255,0,0);
    ellipse(px+20,py+20,30,30); // Draw a red player
    py+=velocity;
    if (roadstrips[0].y > gridCanvasHeight){
      generateStrip();
      score+=0.2;
    }
    fill(255);
    textSize(15);
    text(Math.floor(score), 30,30);
    velocity = 0.37*frameCount/1000 + 100/py;
    checkDeath();
  }
}

function displayRoadStrips(){
  for (let i = 0; i < roadstrips.length; i++) {
    for (let j = 0; j < gridWidth; j++) {
      if (roadstrips[i].strip[j] === 0) {
        fill(255);
        image(pathBlock, j * 40, roadstrips[i].y, 40, 40);
      }
      if (roadstrips[i].strip[j] === 1) {
        image(obstacleOne, j * 40, roadstrips[i].y, 40, 40);
      }
      if (roadstrips[i].strip[j] === 2) {
        image(obstacleTwo, j * 40, roadstrips[i].y, 40, 40);
      }
    }
    roadstrips[i].y += velocity;
  }
}

function checkDeath(){
  if (playing){
    if(py>gridCanvasHeight-40) {
      playing = false;
      background(255, 0,0);
      textAlign(CENTER);
      fill(255);
      textSize(30);
      text("CLICK TO RETRY",width/2, height/2);
    }
  }
}

function generateStrip() {
  let r = Math.floor(random(3));
  console.log(r);
  let a = [];
  if (r === 0) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(2) < 1) {
        a.push(0);
      }
      else {
        a.push(2);
      }
    }
  }
  if (r === 1) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(5) < 1) {
        a.push(1);
      }
      else{
        a.push(0);
      } 
    }
  }
  if (r === 2) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(7) < 1) {
        a.push(2);
      }
      else {
        a.push(0);
      }
    }
  }
  let last = roadstrips[roadstrips.length-1].y-40;
  roadstrips.push({
    y:last,
    strip: a
  });
  roadstrips.shift();
}

function keyPressed() {
  if(keyCode === UP_ARROW){
    if (!soundEffect.isPlaying()) {
      soundEffect.play();
    }
    if(roadstrips[roadstrips.length-Math.floor(py/40)-1].strip[Math.floor(px/40)]===0 && py>40) {
      py -= 40;
    } 
  }
  if(keyCode === DOWN_ARROW){
    if (!soundEffect.isPlaying()) {
      soundEffect.play();
    }
    if(roadstrips[roadstrips.length-Math.floor(py/40)-3].strip[Math.floor(px/40)]===0 && py>40) {
      py += 40;
    }
  }
  if(keyCode === RIGHT_ARROW){
    if (!soundEffect.isPlaying()) {
      soundEffect.play();
    }
    if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)+1]===0 && px<width-40){
      px += 40;
    }
  }
  if(keyCode === LEFT_ARROW){
    if (!soundEffect.isPlaying()) {
      soundEffect.play();
    }
    if (roadstrips[roadstrips.length-Math.floor(py/40)-2].strip[Math.floor(px/40)-1]===0 && px>=40){
      px -= 40;
    }
  }
}

function mouseClicked(){
  if(!playing){
    setup();
    velocity = 0.5;
    state = "startGame";
  }
}
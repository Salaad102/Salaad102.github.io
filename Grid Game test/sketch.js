// Road Jam
// Salaar Ahmed
// Computer Science 30
// 
// Extra for Experts:
//  

let roadstrips, velocity, px, py, score, playing; // defining variables, not giving them values.
let soundEffect, deathEffect, backgroundMusic;
let menuBackground ,obstacleOne, obstacleTwo, pathBlock, obstacleThree, playerChar;
let gridWidth = 15;
let gridHeight = 19;
let gridCanvasHeight = 800;
let scalar = 0.37;
let state = "gameMenu";

function preload(){ // Loading in music, sound effects, and images 
  backgroundMusic = loadSound("assets/BackgroundMusic.mp3");
  menuBackground = loadImage("assets/Background.png");
  playerChar = loadImage("assets/Police.png");
  soundEffect = loadSound("assets/Movement.mp3.wav");
  deathEffect = loadSound("assets/game_over.mp3");
  obstacleOne = loadImage("assets/Car1.png");
  obstacleTwo = loadImage("assets/taxi1.png");
  obstacleThree = loadImage("assets/truck.png");
  pathBlock = loadImage("assets/roadTexture_41.png");
}

function determineValues() { // Adding values now so my restart game function can call it again.
  roadstrips = [];
  velocity = 0.5;
  px = 280; // Starting x position  of the player, increaments of 40.
  py = 400; // Starting y position of the player, increaments of 40.
  score = 0;
  playing = true;
}

function setup() {
  if (state === "gameMenu"){ // setting up a larger canvas for my menu screen.
    createCanvas(windowWidth,windowHeight);
    image(menuBackground,0,0, width, height);
  }
  else if (state === "startGame"){ // setting up a smaller canvas for my game.
    determineValues();
    createCanvas(600, 800);
    create2dGrid();
    backgroundMusic.setVolume(0.05);
    backgroundMusic.loop();
  }
}

function create2dGrid() { // Creating a 
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

function drawPlayer(){
  imageMode(CENTER);
  image(playerChar, px+20, py+20, 30,30);
  imageMode(CORNER);
}


function draw() { 
  if (playing){
    displayRoadStrips();
    fill(255,0,0);
    drawPlayer();
    py+=velocity;
    if (roadstrips[0].y > gridCanvasHeight){
      generateStrip();
      score+=0.2;
    }
    fill(255);
    textSize(15);
    text(Math.floor(score), 30,30);
    velocity = scalar*frameCount/1000 + 100/py;
    checkDeath();
  }
}

function displayRoadStrips(){ // Displaying the obstacles and road.
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
      if (roadstrips[i].strip[j] === 3){
        image(obstacleThree, j * 40, roadstrips[i].y, 40, 40);
      }
    }
    roadstrips[i].y += velocity;
  }
}

function checkDeath(){ //Checking if the player's height is greater than the canvas height.
  if (playing){
    if(py>gridCanvasHeight-40) {
      playing = false;
      background(255, 0,0);
      textAlign(CENTER);
      fill(255);
      textSize(30);
      text("CLICK TO RETRY",width/2, height/2);
      state = "gameOver";
    }
    if (state === "gameOver") {
      deathEffect.setVolume(0.3);
      deathEffect.play();
      backgroundMusic.stop();
    }
    else if (state === "startGame"){
      deathEffect.stop();
    }
  }
}

function generateStrip() { // Generating the obstacles and the road randomly.
  let r = Math.floor(random(3));
  console.log(r);
  let a = [];
  if (r === 0) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(6) < 1) {
        a.push(3);
      }
      else {
        a.push(0);
      }
    }
  }
  if (r === 1) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(6) < 1) {
        a.push(1);
      }
      else{
        a.push(0);
      } 
    }
  }
  if (r === 2) {
    for (let i = 0; i < gridWidth; i++) {
      if (random(6) < 1) {
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

function keyPressed() { // If the block next to it is not a Pathblock then it will not move, if it is then it will move in the desired direction.
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

function mousePressed(){
  if (state === "gameMenu") {
    state === "startGame";
  }
  if(!playing){ // Restarts the game by having the setup run again
    setup();
    velocity = 0.5;
    state = "startGame";
  }
}
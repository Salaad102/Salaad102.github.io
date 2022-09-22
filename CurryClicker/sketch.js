// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let landscape;
let curryBowl;
let score;
let adjustments;

function preload() {
  landscape = loadImage("blackMarble.png"); // Making the background an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
  
} 

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
}

function draw() {
  imageMode(CENTER);
  image(landscape, width/2, height/2, width, height); // Background location in middle of screen
  imageMode(CORNER)
  let curryBowlx = width/2 - curryBowl.width/2;
  let curryBowly = height/2 - curryBowl.height/2;
  image(curryBowl, curryBowlx, curryBowly, curryBowl.width, curryBowl.height); // Curry bowl location in middle
  textSize(45);
  fill("white");
  text(score + " Curry", width/2 - 75, height*0.95); // text location in under curry bowl
}

function mouseClicked() { 
  imageMode(CORNER)
  if (mouseX < curryBowl.width*2) {
    score++;  
  }
}


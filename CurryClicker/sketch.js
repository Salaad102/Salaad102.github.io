// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let landscape;
let curryBowl;
let score;

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
  image(curryBowl, width/2, height/2, width/2, height); // Curry bowl location in middle
  textSize(45);
  fill("white");
  text(score + " Curry", width/2 - 75, height*0.95); // text location in under curry bowl
}

function mouseClicked() { 
  if (mouseX > width/2 && mouseY > height/2) {
    score++;  
  }
}


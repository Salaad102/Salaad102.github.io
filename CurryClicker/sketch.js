// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let landscape;
let curryBowl;
let curry = 0;
let imageWidth = 150;
let imageHeight = 150;
let score;

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
}

function draw() {
  imageMode(CENTER);
  image(landscape, width/2, height/2, width, height); // Background location in middle of screen
  image(curryBowl, 60, 60, imageWidth, imageHeight); // Curry bowl location in top left
  textSize(45);
  text(score + " Curry", 125, 75);
}

function preload() {
  landscape = loadImage("Indian_Spices.jpg"); // Making the background an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
} 

function mouseClicked() { 
  score++;
  
}


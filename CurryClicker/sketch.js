// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let landscape;
let curryBowl;
let curry = 0;
let imageWidth = 60;
let imageHeight = 60;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
}

function draw() {
  imageMode(CENTER);
  image(landscape, width/2, height/2, width, height); // Background location in middle of screen
  image(curryBowl, imageWidth, imageHeight, 150, 150); // Curry bowl location in top left
  textSize(45);
  text("Curry", 120, 45, 50, 50);
}

function preload() {
  landscape = loadImage("Indian_Spices.jpg"); // Making the background an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
} 

function mouseClicked() { 
  curry++;
  
}


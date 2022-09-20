// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let landscape;
let curryBowl;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
}

function draw() {
  imageMode(CENTER);
  image(landscape, width/2, height/2, width, height);
}

function preload() {
  landscape = loadImage("Indian_Spices.jpg");
  curryBowl = loadImage("CurryBowl.png");
} // Making the background an image

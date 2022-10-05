// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// make a a golden curry fall down, if mouse x & y collide with it then enter curry frenzie where curry clicking is doubled
// make a start screen state, game state, shop state, and 


let landscape;
let curryBowl;
let spoonIcon;
let ladleIcon;
let spoonCounter;
let score;
let adjustments;
let curryBowlx;
let curryBowly;
let scalar = 0.2;
let spoon = 0;
let iconx;
let icony;
let ladlex;
let ladley;
let spoonMultiplier;
let currentTime;
let interval = 2;

function preload() {
  landscape = loadImage("blackMarble.png"); // Making the background an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
  spoonIcon = loadImage("spoon2.png"); // Making a spoon icon
  ladleIcon = loadImage("Ladle.PNG");
} 

function createCurry() { //random bowl of curry is made in a certain area
  image(curryBowl, random(curryBowlx, curryBowlx*2 - curryBowlx/2), random(curryBowlx, curryBowly), curryBowl.width*scalar, curryBowl.height*scalar);
}

function curryNumber() {
  textSize(45);
  fill("white");
  text(score + " Curry", width/2 - 75, height*0.95); // text location in under curry bowl
}

function timer() {
  textSize(45);
  currentTime = int(millis() / 1000);
  fill("white");
  text("TIME: " + currentTime, width/2 - 75, height*0.05);
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  score = 0;
  curryBowlx = width/2 - curryBowl.width/2;
  curryBowly = height/2 - curryBowl.height/2;
  iconx = spoonIcon.width*scalar;
  icony = spoonIcon.height*scalar;
}

function draw() {
  imageMode(CENTER);// Tidy this to one function for importing images
  image(landscape, width/2, height/2, width, height); // Background location in middle of screen
  imageMode(CORNER);
  image(curryBowl, curryBowlx, curryBowly, curryBowl.width, curryBowl.height); // Curry bowl location in middle
  image(spoonIcon, 0, height/10, iconx, icony);
  image(ladleIcon,0, height/3, iconx, icony);
  timer();
  curryNumber();
  if (millis() >= 2) {
    //
  }
  if(frameCount % (interval * 30) === 0){
    score = score + spoon;
  }
}

function mouseClicked() { 
  if (mouseX > curryBowlx && mouseX < curryBowlx + curryBowl.width && mouseY > curryBowly && mouseY < curryBowly + curryBowl.height) {
    score++; 
    createCurry();
  }
}

function keyPressed() {
  if (score >= 10)  {
    if (keyCode === 83){ // If score is greater than 10 and the s key is pressed, add a spoon and take away 10 curry.
      score = score - 10;
      spoon = spoon + 1;
    }
  }
}
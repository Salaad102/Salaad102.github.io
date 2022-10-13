// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// make a a golden curry fall down, if mouse x & y collide with it then enter curry frenzie where curry clicking is doubled
// make a start screen state, game state, shop state.
// shop state should be with a keyboard input and buy stuff with mouse input
// fix icons make them with updating prices
// fix circle clicking area, instead of a square
// if timer > 300000 millis() aka 5 min then random golden curry spawn

let state = "StartScreen";
let backgrounds;
let curryBowl;
let spoonIcon;
let ladleIcon;
let startScreenimg;
let score = 0;
let curryBowlx;
let curryBowly;
let scalar = 0.25;
let spoon = 0;
let ladle = 0;
let iconx;
let icony;
let currentTime;
let currentRadius = 200;
let radius = 200;
let interval = 0;


function preload() {
  backgrounds = loadImage("blackMarble.png"); // Making the backgrounds an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
  spoonIcon = loadImage("Spoon2.png"); // Making a spoon icon
  ladleIcon = loadImage("Ladle.PNG");
  startScreenimg = loadImage("Startscreen.jpg");
} 

function createCurry() { //random bowl of curry is made in a certain area
  image(curryBowl, random(curryBowlx, curryBowlx*2 - curryBowlx/2), random(curryBowlx, curryBowly), curryBowl.width*scalar, curryBowl.height*scalar);
}

function importImages() {
  imageMode(CENTER);
  image(backgrounds, width/2, height/2, width, height); // Background location in middle of screen
  imageMode(CENTER);
  image(curryBowl, curryBowlx, curryBowly, currentRadius * 2, currentRadius * 2); // Curry bowl location in middle
  imageMode(CORNER);
  image(spoonIcon, 0, height/10, iconx, icony);
  image(ladleIcon,0, height/3, iconx, icony);
  
}

function curryNumber() {
  textSize(45);
  fill("white");
  text(round(score) + " Curry", width/2 - 75, height*0.95); // text location in under curry bowl
}

function spoonPrice() {
  textSize(25);
  fill("white");
  text("$" + round(100*pow(1.25, spoon)) + " Curry", 10, 200, iconx, icony);
}
function timer() {
  textSize(45);
  currentTime = int(millis() / 1000);
  fill("white");
  text("TIME: " + currentTime, width/2 - 75, height*0.05);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  curryBowlx = width/2;
  curryBowly = height/2;
  iconx = spoonIcon.width*scalar;
  icony = spoonIcon.height*scalar;
}

function draw() {
  if (state === "StartScreen"){
    startScreen();
  }
  if (state === "StartGame"){
    startGame();
    spoonPrice();
  }
}

function mouseClicked() {
  // console.log(mouseX, mouseY);
  if (state === "StartScreen" && mouseInsideButton(windowWidth/2 - 200, windowWidth/2 + 200, 400, 550)){
    state = "StartGame";
  }
  if (state === "StartGame"){
    let distance = dist(curryBowlx, curryBowly, mouseX, mouseY);
    if (distance <= radius) {
      currentRadius = 150;
      score++;
    }
    // if (mouseX > curryBowlx && mouseX < curryBowlx + curryBowl.width && mouseY > curryBowly 
    //   && mouseY < curryBowly + curryBowl.height) { // turn this into a circle function
    //   score++; 
    //   createCurry();
    // }
    // if mouse is clicked on shop icon
  } 
}

function keyPressed() {
  if (state === "shop") {
    let priceIncreaseCurryPerSecond = pow(1.25, spoon);
    if (score >= round(100*priceIncreaseCurryPerSecond)) {
      if (keyCode === 83){ // If score is greater than 100 and the s key is pressed, add a spoon and take away the price of the spoon
        spoon = spoon + 0.1;
        score = score - round(100*priceIncreaseCurryPerSecond);      
      }
    }
    let priceIncreaseLadle = pow(1.25, ladle);
    if (score >= 50*priceIncreaseLadle) {
      if (keyCode === 65){
        ladle = ladle + 1;
        score = score - 50*priceIncreaseLadle;
      }
    }
  }
}

function startGame() {
  currentRadius = lerp(currentRadius, radius, 0.1);
  importImages();
  timer();
  curryNumber();
  if (millis() >= 1000+interval) {
    score = score + spoon;
    interval = millis();
  }
}

function startScreen(){
  image(startScreenimg, 0, 0, windowWidth, windowHeight);
  if (mouseInsideButton(windowWidth/2 - 200, windowWidth/2 + 200, 400, 550)) {
    fill("Red");
  }
  else {
    fill("black");
  }
  rect(windowWidth/2 - 200, 400, 400, 150);
  
}

function mouseInsideButton(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
  mouseY >= top && mouseY <= bottom;
}

// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// make a a golden curry fall down, if mouse x & y collide with it then enter curry frenzie where curry clicking is doubled
// make a start screen state, game state, upgrade state.
// upgrade state is where it opens a menu to buy upgrades for utensils. aka = double spoons makes ur spoon 2x effiencent
// fix icons make them with updating prices
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
let scalar = 0.3;
let spoon = 0;
let spoonPerSecond = 0;
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
  spoonIcon = loadImage("Spoon3.png"); // Making a spoon icon
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

function curryNumberPerSecond() {
  textSize(45);
  fill("White");
  text();
}

function curryNumber() {
  textSize(70);
  fill("white");
  text(round(score) + " Curry", windowWidth/2 - 100, height - radius);
  textSize(30); // text location in under curry bowl
  text(round(spoonPerSecond, 1) + " Per Second", windowWidth/2 - 80, height /2 + radius * 1.7);  
}

function spoonPrice() {
  textSize(30);
  fill("White");
  text("$" + round(15*pow(1.15, spoon)) + " Curry", 175, height/6, iconx, icony);
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
    //   score++;     //   createCurry();
    // }
    // if mouse is clicked on shop icon
  } 
}

function keyPressed() {
  // if (keyCode === 49){
  //   state = "shop";
  // }



  let priceIncreaseCurryPerSecond = pow(1.15, spoon);
  console.log(spoon);
  if (score >= round(15*priceIncreaseCurryPerSecond)) {
    if (keyCode === 83){ // If score is greater than 100 and the s key is pressed, add a spoon and take away the price of the spoon
      spoon = spoon + 1;
      spoonPerSecond = spoonPerSecond + 0.1;
      score = score - round(15*priceIncreaseCurryPerSecond);      
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

function startGame() {
  currentRadius = lerp(currentRadius, radius, 0.1);
  importImages();
  timer();
  curryNumber();
  if (millis() >= 1000+interval) {
    score = score + spoonPerSecond;
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

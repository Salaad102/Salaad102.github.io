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
let backgrounds, curryBowl, spoonIcon, ladleIcon, startScreenimg, bowlIcon; //Images used in my project
let score = 0;
let scalar = 0.3;
let spoon = 0;
let perSecond = 0;
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
  ladleIcon = loadImage("Ladle.png");
  bowlIcon = loadImage("Bowl.png");
  startScreenimg = loadImage("Startscreen.jpg");
} 
function importImages() {
  imageMode(CENTER);
  image(backgrounds, width/2, height/2, width, height); // Background location in middle of screen
  imageMode(CENTER);
  image(curryBowl, width/2, height/2, currentRadius * 2, currentRadius * 2); // Curry bowl location in middle
  imageMode(CORNER);

  image(spoonIcon, 0, height/10, iconx, icony);
  image(ladleIcon,0, height/3, iconx, icony);
  image(bowlIcon, 0, height - height/2.5, iconx, icony);
  
  
  
}

function createCurry() { //random bowl of curry is made in a certain area
  image(curryBowl, random(width/2, width/2*2 - width/2/2), random(width/2, height/2), curryBowl.width*scalar, curryBowl.height*scalar);
}

function curryNumberPerSecond() {
  textSize(45);
  fill("White");
  text();
}

function curryNumber() {
  textSize(70);
  fill("white");
  text(round(score) + " Curry", windowWidth/2 - 100, height*0.1);
  textSize(30); // text location in under curry bowl
  text(round(perSecond, 1) + " Per Second", windowWidth/2 - 80, height /2 + radius * 1.7);  
}

function UtensilPrice() {
  textSize(30);
  fill("White");
  text("$" + round(15*pow(1.15, spoon)) + " Curry", 175, height/6, iconx, icony);
  text("$" + round(100*pow(1.15, ladle)) + " Curry", 175, height/2.5, iconx, icony);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  iconx = spoonIcon.width*scalar;
  icony = spoonIcon.height*scalar;
}

function draw() {
  if (state === "StartScreen"){
    startScreen();
  }
  if (state === "StartGame"){
    startGame();
    UtensilPrice();
  }
}

function mouseClicked() {
  // console.log(mouseX, mouseY);
  if (state === "StartScreen" && mouseInsideButton(windowWidth/2 - 200, windowWidth/2 + 200, 400, 550)){
    state = "StartGame";
  }
  if (state === "StartGame"){
    let distance = dist(width/2, height/2, mouseX, mouseY);
    if (distance <= radius) {
      currentRadius = 150;
      score++;
    }
    // if (mouseX > width/2 && mouseX < width/2 + curryBowl.width && mouseY > height/2 
    //   && mouseY < height/2 + curryBowl.height) { // turn this into a circle function
    //   score++;     //   createCurry();
    // }
    // if mouse is clicked on shop icon
  } 
}

function keyPressed() {
  // if (keyCode === 49){
  //   state = "shop";
  // }



  let priceIncreaseCurry = pow(1.15, spoon);
  console.log(spoon);
  if (score >= round(15*priceIncreaseCurry)) {
    if (keyCode === 49){ // If score is greater than 100 and the s key is pressed, add a spoon and take away the price of the spoon
      spoon = spoon + 1;
      perSecond = perSecond + 0.1;
      score = score - round(15*priceIncreaseCurry);      
    }
  }
  let priceIncreaseLadle = pow(1.15, ladle);
  if (score >= 100*priceIncreaseLadle) {
    if (keyCode === 50){
      ladle = ladle + 1;
      perSecond = perSecond + 1;
      score = score - round(100*priceIncreaseLadle);
    }
  }
}

function startGame() {
  currentRadius = lerp(currentRadius, radius, 0.1);
  importImages();
  curryNumber();
  if (millis() >= 1000+interval) {
    score = score + perSecond;
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

// Curry Clicker
// Salaar Ahmed
// Sept. 19, 2022
// Comp Sci 30
// Extra for Experts:
// Learned how to import music and added background music to game.

let state = "StartScreen", stateUpgrade = "None";
let backgrounds, curryBowl, spoonIcon, ladleIcon, startScreenimg, bowlIcon; //Images used in my project
let perSecondSpoon = 0, perSecondLadle = 0, perSecondBowl = 0;
let score = 0, spoon = 0, ladle = 0, bowl = 0, upgradeSpoon = 0, upgradeLadle = 0, upgradeBowl = 0;
let icony;
let currentTime;
let currentRadius = 200, radius = 200;
let interval = 0;
let backgroundMusic;

function preload() {
  backgrounds = loadImage("blackMarble.png"); // Making the backgrounds an image
  curryBowl = loadImage("CurryBowl.png"); // Making curry bowl an image
  spoonIcon = loadImage("Spoon5.png"); // Making a spoon icon
  ladleIcon = loadImage("Ladle2.png");
  bowlIcon = loadImage("Bowl2.png");
  startScreenimg = loadImage("Startscreen.jpg");
  backgroundMusic = loadSound("backgroundMusic.mp3");
} 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (state === "StartScreen"){
    startScreen();
  }
  if (state === "StartGame"){
    startGame();
  }
}

function importImages() {
  imageMode(CENTER);
  image(backgrounds, width/2, height/2, width, height); // Background location in middle of screen
  imageMode(CENTER);
  image(curryBowl, width/2, height/2, currentRadius * 2, currentRadius * 2); // Curry bowl location in middle
  imageMode(CORNER);
  image(spoonIcon, 0, height/10, spoonIcon.width, spoonIcon.height);
  image(ladleIcon,0, height/10 + height/5, ladleIcon.width, ladleIcon.height);
  image(bowlIcon, 0, height/2, bowlIcon.width, bowlIcon.height);
  
}

function curryNumber() {
  textSize(70);
  fill("white");
  text(round(score) + " Curry", windowWidth/2, height*0.1);
  textSize(30); // text location in under curry bowl
  text(round(perSecondSpoon + perSecondLadle + perSecondBowl, 1) + " Per Second", windowWidth/2, height /2 + radius * 1.7);  
}

function UtensilPrice() {
  textSize(30);
  fill("White");
  text("$" + round(15*pow(1.15, spoon)) + " Curry", 250, windowHeight/4, spoonIcon.width, spoonIcon.height);
  text("$" + round(100*pow(1.15, ladle)) + " Curry", 250, windowHeight/4 + ladleIcon.height + ladleIcon.height/4, ladleIcon.width, ladleIcon.height);
  text("$" + round(300*pow(1.15, bowl)) + " Curry", 250, windowHeight/4 + ladleIcon.height*2 + ladleIcon.height/4, bowlIcon.width, bowlIcon.height);
}

function mouseClicked() {
  if (state === "StartScreen" && mouseInsideButton(windowWidth/2 - 200, windowWidth/2 + 200, windowHeight/2 - 75, windowHeight/2 + 75)){
    backgroundMusic.play();
    state = "StartGame";
  }
  if (state === "StartGame"){
    let distance = dist(width/2, height/2, mouseX, mouseY);
    if (distance <= radius) {
      currentRadius = 150;
      score++;
    }
  } 
}

function keyPressed() {
  let priceIncreaseCurry = pow(1.15, spoon);
  console.log(spoon);
  if (score >= round(15*priceIncreaseCurry)) {
    if (keyCode === 49){ // If score is greater than 100 and the s key is pressed, add a spoon and take away the price of the spoon
      spoon++;
      perSecondSpoon = perSecondSpoon + 0.1;
      score = score - round(15*priceIncreaseCurry);      
    }
  }
  let priceIncreaseLadle = pow(1.15, ladle);
  if (score >= 100*priceIncreaseLadle) {
    if (keyCode === 50){
      ladle++;
      perSecondLadle = perSecondLadle + 1;
      score = score - round(100*priceIncreaseLadle);
    }
  }
  let priceIncreaseBowl = pow(1.15, bowl);
  if (score >= 300*priceIncreaseBowl) {
    if (keyCode === 51){
      bowl++;
      perSecondBowl = perSecondBowl + 2;
      score = score - round(300*priceIncreaseBowl);
    }
  }
  let upgradePriceSpoon = pow(1.5, upgradeSpoon);
  if (score >= 100*upgradePriceSpoon) {
    if (keyCode === 52) {
      upgradeSpoon++;
      perSecondSpoon = perSecondSpoon*2;
      score = score - round(100*upgradePriceSpoon);
    }
  }
  let upgradePriceLadle = pow(1.5, upgradeLadle);
  if (score >= 500*upgradePriceLadle) {
    if (keyCode === 53) {
      upgradeLadle++;
      perSecondLadle = perSecondLadle*2;
      score = score - round(500*upgradePriceLadle);
    }
  }
  let upgradePriceBowl = pow(1.5, upgradeBowl);
  if (score >= 1000*upgradePriceBowl) {
    if (keyCode === 54) {
      upgradeBowl++;
      perSecondBowl = perSecondBowl*2;
      score = score - round(1000*upgradePriceBowl);
    }
  }
}

function showBox(description, owned, upgradePrice, button){
  rectMode(CORNER);
  rect(mouseX, mouseY, 400, 150);
  textSize(30);
  fill("black");
  text(description, mouseX + 400/2, mouseY + 40);
  text(owned, mouseX + 400/2, mouseY + 70);
  text(upgradePrice, mouseX + 400/2, mouseY + 100);
  text(button, mouseX + 400/2, mouseY + 130);
  rectMode(CENTER);
}

function iconHover(){
  if (mouseInsideButton(0,spoonIcon.width, height/10, height/10 - spoonIcon.height/-1)) {
    showBox("Adds 0.1 Curry per second", "You have: " + spoon, "upgrade price: $" + 100*pow(1.5, upgradeSpoon),
      "press 4 to upgrade");
  }
  if (mouseInsideButton(0, ladleIcon.width, height/10 + height/5, height/10 + height/5 - ladleIcon.height/-1)) {
    showBox("Adds 1 Curry per second", "You have: " + ladle, "upgrade price: $" + 500*pow(1.5, upgradeLadle,),
      "press 5 to upgrade");
  }
  if (mouseInsideButton(0, bowlIcon.width, height/2, height/2 - bowlIcon.height/-1)) {
    showBox("Adds 2 Curry per second", "You have: " + bowl, "upgrade price: $" + 1000*pow(1.5, upgradeBowl),
      "press 6 to upgrade");
  }
}

function startGame() {
  currentRadius = lerp(currentRadius, radius, 0.1);
  importImages();
  iconHover();
  curryNumber();
  UtensilPrice();
  if (millis() >= 1000+interval) {
    score = score + perSecondSpoon + perSecondLadle + perSecondBowl;
    interval = millis();
  }
}

function startScreen(){
  image(startScreenimg, 0, 0, windowWidth, windowHeight);
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(60);
  fill("white");
  text("Curry Clicker", windowWidth/2, windowHeight/3);
  
  if (mouseInsideButton(windowWidth/2 - 200, windowWidth/2 + 200, windowHeight/2 - 75, windowHeight/2 + 75)) {
    fill("red");
  }
  else {
    fill("black");
  }
  rect(windowWidth/2, windowHeight/2, 400, 150);
  fill("whited");
  text("Play", windowWidth/2, windowHeight/2);
}

function mouseInsideButton(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
  mouseY >= top && mouseY <= bottom;
}
// Start screen demo
// Salaar
// Oct. 3


let state = "start";
let platesImg;

function preload(){
  platesImg = loadImage("Plates.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  if(mouseInsideRec(400,700,400,550)){
    fill("grey");
  }
  else {
    fill("black");
  }


  if (state === "start"){
    startScreen();
  }
  if (state === "main"){
    image(platesImg, 0,0, windowWidth, windowHeight);
  }
}


function startScreen() {
  fill("black");
  rect(400, 400, 300, 150);
  
}

function mousePressed(){
  if (state === "start" && mouseInsideRec(400, 700, 400, 550)) {
    state = "main";
  }
}

function mouseInsideRec(left, right, top, bottom) {
  return mouseX >= left & mouseX <= right && mouseY >= top && mouseY <= bottom;
}
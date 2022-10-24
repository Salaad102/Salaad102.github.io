// Bouncing Balls array collision
// Salaar Ahmed
// Oct, 24
//

let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  theCircles.push(spawnball(100, 100));
}

function draw() {
  background(220);
  //move
  for (let i=0; i<theCircles.length; i++){
    theCircles[i].x += theCircles[i].dx;
    theCircles[i].y += theCircles[i].dy;

    if (theCircles[i].x + theCircles[i].radius> width || theCircles[i].x - theCircles[i].radius< 0){
      theCircles[i].dx *= -1;
    }
    if (theCircles[i].y +theCircles[i].radius > height || theCircles[i].y - theCircles[i].radius < 0){
      theCircles[i].dy *= -1;
    }
  }
  //display
  for (let thisCircle of theCircles) {
    noStroke();
    fill(thisCircle.theColor);
    circle(thisCircle.x, thisCircle.y, thisCircle.radius*2);
  }
  //left-right edges
}

function spawnball(tempX, tempY){
  let newBall = {
    x: tempX,
    y: tempY,
    radius: random(25, 100),
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColor: color(random(255), random(255), random(255), random(255))
  };
  return newBall;
}

function mousePressed(){
  theCircles.push(spawnball(mouseX, mouseY));
}
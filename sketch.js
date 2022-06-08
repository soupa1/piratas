//Revisão sobre Matrizes
//Exemplos
var matriz1 = [2,78,21,36,45];
console.log(matriz1);

var matriz2 = ["Melissa", 23, true, "Felipe", 15, false];
//console.log(matriz2);

var matriz3 = [matriz1, matriz2];
//console.log(matriz3);

//console.log(matriz1[3]);
//console.log(matriz2[2]);
//console.log(matriz3[1][4]);

matriz1.push(1000);
//console.log(matriz1);
matriz1.pop();
//console.log(matriz1);



const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, ground;
var backgroundImg;
var tower, towerImg;;
var canhao, canhaoAng;
var cannonBall
var cannonBalls = [];
var boat;
var boats = [];
var boatAnimation = [];
var boatDados, boatSpritesheet;
var boatDeathAnimation = [];
var boatDeathDados, boatDeathSpritesheet;
var ballSplash = [];
var ballSplashDados, ballSplashSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  boatDados = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png");
  boatDeathDados = loadJSON("./assets/boat/brokenBoat.json")
  boatDeathSpritesheet = loadImage("./assets/boat/brokenBoat.png")
  ballSplashDados = loadJSON("./assets/waterSplash/waterSplash.json")
  ballSplashSpritesheet = loadImage("./assets/waterSplash/waterSplash.png")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  canhaoAng = 20;
  canhao = new Canhao(180, 110, 130, 100, canhaoAng)

 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 tower = Bodies.rectangle(160, 350, 160, 310, options);
 World.add(world, tower);

 var boatFrames = boatDados.frames;
 for(var i = 0; i < boatFrames.length; i++){
   var pos = boatFrames[i].position;
   var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
   boatAnimation.push(img);
 }

 var boatDeathFrames = boatDeathDados.frames;
 for(var i = 0; i < boatDeathFrames.length; i++){
   var pos = boatDeathFrames[i].position;
   var img = boatDeathSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
   boatDeathAnimation.push(img);
 }

 var ballSplashFrames = ballSplashDados.frames;
 for(var i = 0; i < ballSplashFrames.length; i++){
   var pos = ballSplashFrames[i].position;
   var img = ballSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
   ballSplash.push(img);
 }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, 1200, 600);
  
  canhao.display();
  
  Engine.update(engine);
 
  rect(ground.position.x, ground.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(towerImg,tower.position.x, tower.position.y, 160, 310);
  pop();
   
  for(var i = 0; i < cannonBalls.length; i ++) {
    cannonShow(cannonBalls[i], i);
    colisao(i);
  }

  boatShow();

}


function keyReleased() {
  if(keyCode === DOWN_ARROW) {
    cannonBalls[cannonBalls.length - 1].shoot();
  }
}

function keyPressed() {
  if(keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(canhao.posX, canhao.posY);
    cannonBalls.push(cannonBall);
  }
}

function cannonShow(ball, i) {
  if(ball) {
    ball.display();
    ball.animate();
    if(ball.body.position.x >= width || ball.body.position.y >= height-50) { 
      ball.removeBall(i);
    }
  }
}

function boatShow() {
  if (boats.length > 0) {
    if (boats[boats.length-1] === undefined || boats[boats.length -1].body.position.x < width -300) {
      var positions = [-40, -60, -70, -20];
      var positions2 = random(positions);
      var boat = new Boat(width, height-100, 170, 170, positions2, boatAnimation);
      boats.push(boat)
    }

    for (var i = 0; i < boats.length; i ++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0});
        boats[i].display();
        boats[i].animate();
      }
    }
  }
  else {
    var boat = new Boat(width, height-60, 170, 170, -80, boatAnimation);
    boats.push(boat);
  }
}

function colisao(index) {
  for (var i = 0; i < boats.length; i ++) { 
    if(cannonBalls[index] !== undefined && boats[i] !== undefined){ 
      var collisaoVer = Matter.SAT.collides(cannonBalls[index].body, boats[i].body);

      if(collisaoVer.collided) {
        boats[i].removeBoat(i);
        Matter.World.remove(world, cannonBalls[index].body);
        delete cannonBalls[index];

      }
    }
  }
}
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
var tower, towerImg;
var canhao, canhaoAng;
var cannonBall
var cannonBalls = [];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
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
  }


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
  }
}
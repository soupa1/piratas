class Boat {
    constructor(x, y, width, height, boatPos, boatAnimation) {
    
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
      this.image = loadImage("./assets/boat.png");
      this.boatPosition = boatPos;
      this.animation = boatAnimation;
      this.velocidade = 0.05;
      this.sink = false;
      World.add(world, this.body);
    }
  
    animate(){
      this.velocidade += 0.05;
    }

    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.velocidade % this.animation.length);
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.boatPosition, this.width, this.height);
      pop();
    }

    removeBoat(index) { 
      this.animation = boatDeathAnimation;
      this.velocidade = 0.05;
      this.width = 300;
      this.height = 300;
      this.sink = true;

      setTimeout(() => { 
        Matter.World.remove(world, boats[index].body);
        delete boats[index];
      }, 2000);
  }
} 
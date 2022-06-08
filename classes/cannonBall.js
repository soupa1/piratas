class CannonBall {
    constructor(posX, posY){
        this.r = 30;
        var options = {
            isStatic: true
        }
        this.body = Bodies.circle(posX, posY, this.r, options);
        this.img = loadImage("./assets/cannonball.png");
        this.rastro = [];
        this.velocidade = 0.05;
        this.animation = [this.img];
        this.splash = false;
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var index = floor(this.velocidade % this.animation.length);
        var angle = this.body.angle;
        
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.r, this.r);
        pop();

        if(this.body.velocity.x >  0 && pos.x > 10 && !this.splash) {
            var posicao = [pos.x, pos.y];
            this.rastro.push(posicao);
        }

        for(var i = 0; i < this.rastro.length; i ++) {
            image(this.img, this.rastro[i][0], this.rastro[i][1], 5,5);
        }
    }

    animate(){
        this.velocidade += 0.05;
      }

    shoot(){
        var angRad = canhao.ang - 28;
        angRad *= (3.14 / 180);
        var velocity = p5.Vector.fromAngle(angRad);
        velocity.mult(0.5);

        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)});
    }

    removeBall(index) { 
        this.splash = true;
        Matter.Body.setVelocity(this.body, {x: 0, y: 0});
        this.animation = ballSplash
        this.velocidade = 0.05
        this.r = 150;
        setTimeout(() => { 
          Matter.World.remove(world, this.body);
          delete cannonBalls[index];
        }, 1000);
    }
}


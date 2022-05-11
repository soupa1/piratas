class CannonBall {
    constructor(posX, posY){
        this.r = 30;
        var options = {
            isStatic: true
        }
        this.body = Bodies.circle(posX, posY, this.r, options);
        this.img = loadImage("./assets/cannonball.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.img, pos.x, pos.y, this.r, this.r);
        pop();
    }

    shoot(){
        var angRad = canhao.ang - 28;
        angRad *= (3.14 / 180);
        var velocity = p5.Vector.fromAngle(angRad);
        velocity.mult(0.5);

        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)});
    }
}

class CannonBall {
    constructor(posX, posY){
        this.r = 30;
        var options = {
            isStatic: true
        }
        this.body = Bodies.circle(posX, posY, this.r, options);
        this.img = loadImage("./assets/cannonball.png");
        this.rastro = [];
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.img, pos.x, pos.y, this.r, this.r);
        pop();

        if(this.body.velocity.x >  0 && pos.x > 10) {
            var posicao = [pos.x, pos.y];
            this.rastro.push(posicao);
        }

        for(var i = 0; i < this.rastro.length; i ++) {
            image(this.img, this.rastro[i][0], this.rastro[i][1], 5,5);
        }
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

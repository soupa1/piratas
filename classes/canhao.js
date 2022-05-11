class Canhao {
    constructor(posX, posY, lar, alt, ang){
        this.posX = posX;
        this.posY = posY;
        this.lar = lar;
        this.alt = alt;
        this.ang = ang;
        this.img = loadImage("./assets/cannonBase.png");
        this.img2 = loadImage("./assets/cannon.png");
    }

    display () {
        if (keyIsDown(RIGHT_ARROW) && this.ang < 70){
            this.ang += 1;
        }

        if (keyIsDown(LEFT_ARROW) && this.ang > -20){
            this.ang -= 1;
        }

        push();
        translate(this.posX, this.posY);
        rotate(this.ang);

        imageMode(CENTER);
        image(this.img2, 0, 0, this.lar, this.alt);
        pop();

        image(this.img, 70, 20, 200, 200);
        noFill();
    }
}
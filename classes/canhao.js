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
        push();
        imageMode(CENTER);
        image(this.img2, this.posX, this.posY, this.lar, this.alt);
        pop();

        image(this.img, 70, 20, 200, 200);
        noFill();
    }
}
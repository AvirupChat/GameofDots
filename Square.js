class Square {
  constructor(x1, y1, x2, y2 , x3, y3, x4, y4) {
    this.posX1 = x1;
    this.posY1 = y1;

    this.posX2 = x2;
    this.posY2 = y2;

    this.posX3 = x3;
    this.posY3 = y3;

    this.posX4 = x4;
    this.posY4 = y4;
  }
  
  draw(){
    strokeWeight(1);
    fill('rgb(100%,0%,10%)');
    quad(this.posX1, this.posY1, this.posX2, this.posY2,
         this.posX3, this.posY3, this.posX4, this.posY4);
  }
}
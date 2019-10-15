class Line {
  constructor(x1, y1, x2, y2, mouse) {
    this.posX1 = x1;
    this.posY1 = y1;
    if(!mouse) {
    this.posX2 = x2;
    this.posY2 = y2;
    this.followMouse = false;
    } else {
      this.posX2 = mouseX;
      this.posY2 = mouseY;
      this.followMouse = true;
    }
  }

  execute(){
    this.update();
    this.draw();
  }

  update() {
    if(this.followMouse) {
      this.posX2 = mouseX;
      this.posY2 = mouseY;
    } 
  }

  draw(){
    strokeWeight(4);
    stroke(255);
    line(this.posX1, this.posY1, this.posX2, this.posY2);
  }
}
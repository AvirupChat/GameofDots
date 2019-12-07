class HumanPlayer extends Player {
  constructor(id) {
    super();
    this.completedSquares = 0;
    this.sX = mouseX;
    this.sY = mouseY;
    this.lineGuide = null;
    this.selectedDot = null;
    this.anchorPoint = null;
    this.lineCoordinate = [];
    this.inControl = false;
    this.latchSelection = false;
    this.id = id;
  }

  update(){
    this.sX = mouseX;
    this.sY = mouseY;
  }
  
  action() {
    if(this.inControl) {
/*
      if (this.selectedDot != null && this.anchorPoint == null) {
        this.anchorPoint = this.selectedDot;
        this.selectedDot = null;
      } else if(this.selectedDot != null && this.anchorPoint != null) {
        this.valideLine = this.selectedDot.validateConnection(this.anchorPoint.i, this.anchorPoint.j);
      }

      if(this.valideLine) {
        this.lineCoordinate = [this.anchorPoint.posX, this.anchorPoint.posY, this.selectedDot.posX, this.selectedDot.posY];
      }*/
      if(pressedFlag && !this.latchSelection){
        this.latchSelection = true;
      }else if(pressedFlag && this.latchSelection) {
        this.latchSelection = false;
      }

      if (this.lineGuide == null &&  !this.latchSelection && this.anchorPoint != null){
        this.lineGuide = new Line(this.anchorPoint.posX, this.anchorPoint.posY, mouseX, mouseY);
        this.latchSelection = true;
      } else if(this.lineGuide != null && pressedFlag && this.latchSelection && !this.valideLine) {
        this.valideLine = this.selectedDot.validateConnection(this.anchorPoint.i, this.anchorPoint.j);
      } else if(this.valideLine) {
        this.lineCoordinate = [this.anchorPoint.posX, this.anchorPoint.posY, this.selectedDot.posX, this.selectedDot.posY];
        this.latchSelection = false;
      }else if(this.lineGuide != null) {
        this.lineGuide.update(this.anchorPoint.posX, this.anchorPoint.posY, mouseX, mouseY);
      }
    } else {
    }
           
  }

  setDot(dot) {
    this.selectedDot = dot;
  }

  draw() {
    if(this.lineGuide != null) {
      this.lineGuide.draw();
    }

    fill(255);
    textSize(10);
    stroke(0)
    textAlign(LEFT, CENTER);
    text("Player:" +this.id, 0, 250);
    text("sX,sY: (" + this.sX +"," + this.sY + ")", 0, 300);

  }
}
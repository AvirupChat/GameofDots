class Circle {

    constructor(r, x, y, pCol, pRow) {
      //Shape Properties
      this.radius = r;
      this.posX = x;
      this.posY = y;
      
      // Triggers
      this.mouseOver = false;
      this.cMousePressed = false;
      this.cSelected = false;
      this.selectionLatch = false;

      //Number of possible connections
      if((pRow == 0 && pCol == 0) || (pRow == cNum - 1 && pCol == 0) ||(pRow == 0 && pCol == cNum - 1)  || (pRow == cNum - 1 && pCol == cNum - 1)) {  
        this.possibleConnections = 2;  
      } else if(pRow == 0 || pCol == 0 || pRow == cNum - 1 || pCol == cNum - 1) {
        this.possibleConnections = 3; 
      } else {
        this.possibleConnections = 4;
      }
  
      this.pRow = pRow;
      this.pCol = pCol;
    }
    
    update() {
      //Mouse is over this circle
      this.mouseOver = (mouseX > this.posX - this.radius && mouseX < this.posX + this.radius) && 
      (mouseY > this.posY - this.radius  && mouseY < this.posY + this.radius );
      
      //Mouse is pressed on this circle
      this.cMousePressed = this.mouseOver && pressedFlag;
      
      //Circle has been clicked

      if(this.cMousePressed) {
        this.selectionLatch = true
      } else if (this.selectionLatch && releasedFlag) {
        this.cSelected = true;
        this.selectionLatch = false;
      } else {
        this.cSelected = false;
      } 
    }
    
    isSelected() {
      return this.cSelected;
    }

    getPosition() {
      return [this.posX, this.posY];
    }

    validateConnection(jCol, iRow) {
      let validX = iRow - this.pRow;
      let validY = jCol - this.pCol;

      //console.log(validX + "," + validY);
      //console.log(abs(validX) + "," + abs(validY));

      let validitity = (abs(validX) == 1 && abs(validY) == 0) || (abs(validX) == 0 && abs(validY) == 1);
      return validitity;

    }

    draw() {
      strokeWeight(0);
            
      if(this.mouseOver) {
        //debug
        fill(255);
        textSize(12);
        stroke(0)
        textAlign(LEFT, CENTER);
        text("Connections: " + this.possibleConnections, 0, 50);
        text("Row: " + this.pRow, 0, 70);
        text("Col: " + this.pCol, 0, 90);
        text("Latch: " + this.selectionLatch, 0, 110);
        text("Selected: " + this.cSelected, 0, 130);
        text("Global Press: " + pressedFlag, 500, 10);
        text("Local Press: " + this.cMousePressed, 500, 30);
        text("Released: " + releasedFlag, 500, 50);
        //debug end

        if(this.cMousePressed) {
            fill(0, 0, 0); 
        } else { 
            fill(34, 255, 0);
        }
      }
      else {
        fill(145, 141, 77);
      }
      
      ellipse(this.posX,this.posY,this.radius,this.radius);

   /*   fill(255);
      textSize(12);
      stroke(0)
      textAlign(RIGHT, CENTER);*/


    }
}
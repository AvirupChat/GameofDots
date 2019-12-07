class Dots {

    constructor(r, x, y, i, j) {
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
      if((j == 0 && i == 0) || (j == cNum - 1 && i == 0) ||(j == 0 && i == cNum - 1)  || (j == cNum - 1 && i == cNum - 1)) {  
        this.possibleConnections = 2;  
      } else if(j == 0 || i == 0 || j == cNum - 1 || i == cNum - 1) {
        this.possibleConnections = 3; 
      } else {
        this.possibleConnections = 4;
      }
  
      this.i = i;
      this.j = j;
    }
    
    update(playerMousePosX, playerMousePosY) {
      //Mouse is over this circle
      this.mouseOver = (playerMousePosX > this.posX - this.radius && playerMousePosX < this.posX + this.radius) && 
      (playerMousePosY > this.posY - this.radius  && playerMousePosY < this.posY + this.radius );      
    }
    
    getPosition() {
      return [this.posX, this.posY];
    }

    validateConnection(jCol, iRow) {
      let validX = iRow - this.i;
      let validY = jCol - this.j;

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
        text("Row: " + this.i, 0, 70);
        text("Col: " + this.j, 0, 90);
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
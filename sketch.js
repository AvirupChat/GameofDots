//General Properties
let canvas;
let canvasSize = 1000;
let canvasPadding = 80;
let gridSize = canvasSize - 2 * canvasPadding;
let sLength = 80;

//Mouse Triggers
let pressedFlag = false;
let releasedFlag = false;

//Circle Properties
let circles = [];
let gameState = 0;
let cRadius = 10;
let cNum = Math.round((canvasSize - 2 * canvasPadding) / sLength);
let minLimit = canvasPadding;
let maxLimit = canvasPadding + sLength * (cNum - 1);
let Game;

//Line Properties
let guideLine;
let x1Index = 0;
let y1Index = 0;

//Player
playerTurn = 1;

function setup() {

  canvas = createCanvas(canvasSize, canvasSize);
  centerCanvas();
  canvas.parent('canvas');
  
  background(0);  
  Game = new BoardManager();
  for(var i = 0; i <= cNum; i++) {
    let cRow = [];
    for(var j = 0; j <= cNum; j++) {
      cRow.push(new Circle(cRadius, canvasPadding + i * sLength, canvasPadding + j * sLength, i , j))
    }
    circles.push(cRow);
  }
  
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(0);

  playerSelection();

  Game.draw();
  
  if (guideLine != null){
     guideLine.execute();
  }
  
  //Game Action
  var numOfSquareCreated = 0;

  for(var i = 0; i < cNum; i++) {
    for(var j = 0; j < cNum; j++) {
      circles[i][j].update();

      if(circles[i][j].isSelected()) {
        if(gameState == 0) {
            guideLine = new Line(circles[i][j].posX, circles[i][j].posY, 0, 0, true);
            x1Index = i;
            y1Index = j;
            gameState = 1;
        }else if(gameState == 1) {
          let valide = circles[i][j].validateConnection(x1Index,y1Index);
          if(valide) {
            let firstCircleX = circles[x1Index][y1Index].posX;
            let firstCircleY = circles[x1Index][y1Index].posY;
            let secondCircleX = circles[i][j].posX;
            let secondCircleY = circles[i][j].posY;

            Game.createLine(firstCircleX, firstCircleY, secondCircleX, secondCircleY);
            numOfSquareCreated = Game.checkSquareAround(firstCircleX, firstCircleY, secondCircleX, secondCircleY);
          }
          guideLine = null;
          gameState = 0;
        }
        }
        circles[i][j].draw();     
      } 
    }
/*
  fill(255);
  textSize(12);
  stroke(0)
  textAlign(LEFT, CENTER);
  text("Mouse: (" + mouseX +"," + mouseY + ")", 0, 30);*/

}

function mousePressed() {
  pressedFlag = true;
}

function mouseReleased() {
  releasedFlag = true;
  pressedFlag = false;
}

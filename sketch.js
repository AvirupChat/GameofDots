//General Properties
let canvas;
let canvasSize = 1000;
let canvasPadding = 200;
let gridSize = canvasSize - 2 * canvasPadding;
let sLength = 80;

const VSPLAYER = 1;
const VSCPU = 2;

let Game;
let gameType = VSPLAYER;
//Mouse Triggers
let pressedFlag = false;
let releasedFlag = false;

//Circle Properties
let circles = [];
let gameState = 0;
let dotRadius = 10;
let cNum = Math.round((canvasSize - 2 * canvasPadding) / sLength);
let minLimit = canvasPadding;
let maxLimit = canvasPadding + sLength * (cNum - 1);

//Line Properties
let lineGuide;
let firstSelection, secondSelection;
let x1Index = 0;
let y1Index = 0;

//Player
let Players = [];

function setup() {

  canvas = createCanvas(canvasSize, canvasSize);
  centerCanvas();
  canvas.parent('canvas');
  
  background(0);  
  Game = new BoardManager(1);
  Game.createGrid(cNum, dotRadius, sLength);
  /*
  for(var i = 0; i <= cNum; i++) {
    let cRow = [];
    for(var j = 0; j <= cNum; j++) {
      cRow.push(new Circle(cRadius, canvasPadding + i * sLength, canvasPadding + j * sLength, i , j))
    }
    circles.push(cRow);
  }*/
  
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

  Game.runGame();
  /*
  if (lineGuide != null){
     lineGuide.execute();
  }
  
  //Game Action
  var numOfSquareCreated = 0;

  for(var i = 0; i < cNum; i++) {
    for(var j = 0; j < cNum; j++) {
      circles[i][j].update();

      if(Players[inControl].mousePressed && circles[i][j].mouseOver) {
        if(gameState == 0) {
            lineGuide = new Line(circles[i][j].posX, circles[i][j].posY, 0, 0, true);
            firstSelection = circles[i][j];
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
            secondSelection = circles[i][j];

            Game.createLine(firstSelection.posX, firstSelection.posY, secondSelection.posX, secondSelection.posY);
            numOfSquareCreated = Game.checkSquareAround(firstSelection.posX, firstSelection.posY, secondSelection.posX, secondSelection.posY);
          }
          lineGuide = null;
          gameState = 0;
        }
        }
        circles[i][j].draw();     
      } 
    }*/

  fill(255);
  textSize(10);
  stroke(0)
  textAlign(LEFT, CENTER);
  text("Mouse: (" + mouseX +"," + mouseY + ")", 0, 80);

}

function mousePressed() {
  pressedFlag = true;
}

function mouseReleased() {
  releasedFlag = true;
  pressedFlag = false;
}
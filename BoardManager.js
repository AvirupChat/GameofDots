class BoardManager {
  constructor(gameType) {
    const PLAYER1 = 0;
    const PLAYER2 = 1;

    this.existingLines = new Map();
    this.dots = [];
    this.Squares = [];
    this.lineGuide == null;
    this.dotSelected = -1;
    this.Players = [];
    this.currentPlayer = 0;

    this.Players.push(new HumanPlayer(1));


    if(gameType == 1) {
      this.Players.push(new HumanPlayer(2))
    } else {
      this.Players.push(new HumanPlayer(2))
    }
  }

  createGrid(numberOfDots, dotRadius, dotSpacing) {
    for(var i = 0; i <= numberOfDots; i++) {
      for(var j = 0; j <= numberOfDots; j++) {
        let x = canvasPadding + i * dotSpacing;
        let y = canvasPadding + j * dotSpacing;
        this.dots.push(new Dots(dotRadius, x, y, i , j));
      }
    }   
  }

  runGame() {
    this.action();
    this.draw();
  }
 
  action(){
    this.Players[this.currentPlayer].inControl = true
    this.Players[this.currentPlayer].update();
    
    for(var i = 0; i < this.dots.length; i++) {    
      this.dots[i].update(this.Players[this.currentPlayer].sX, this.Players[this.currentPlayer].sY);

      if(this.dots[i].mouseOver && pressedFlag) {
        this.Players[this.currentPlayer].setDot(this.dots[i]);
      }
    }

    this.Players[this.currentPlayer].action();

    if(this.Players[this.currentPlayer].valideLine) {
      this.createLine(Players[this.currentPlayer].lineCoordinates)
      this.Players[this.currentPlayer].inControl = false;
      if(this.currentPlayer == PLAYER1) {
        this.currentPlayer = PLAYER2;
      } else {
        this.currentPlayer = PLAYER1;
      }
    }

  }

  createLine([x1, y1, x2, y2]) {
    let lineKey = this.keyMaker(x1, y1, x2, y2);

    if (this.existingLines.has(lineKey)) {
      return false;
    } else {
      this.existingLines.set(lineKey, new Line(x1, y1, x2, y2, false));
      return true;
    }
  }

  keyMaker(x1, y1, x2, y2) {
    if ((x1 == x2 && y1 < y2) || (y1 == y2 && x1 < x2)) {
      key = x1 + '' + y1 + '' + x2 + '' + y2;
    } else {
      key = x2 + '' + y2 + '' + x1 + '' + y1;
    }
    return key;
  }
 
  checkSquareAround(x1, y1, x2, y2) {
    let squareFound = false;
    let squareFoundNum = 0;
    let sideKey1;
    let sideKey2;
    let sideKey3;

    if (x1 == x2) {
      //Checking if connections exists on the left
      sideKey1 = this.keyMaker(x1, y1, x1 + sLength, y1);
      sideKey2 = this.keyMaker(x2, y2, x2 + sLength, y2);
      sideKey3 = this.keyMaker(x1 + sLength, y1, x2 + sLength, y2);

      squareFound = this.existingLines.has(sideKey1) && this.existingLines.has(sideKey2) && this.existingLines.has(sideKey3);
      if (squareFound) {
        this.Squares.push(new Square(x1, y1, x1 + sLength, y1, x2 + sLength, y2, x2, y2));
        squareFoundNum++;
      }

      //Checking if connections exists on the right
      sideKey1 = this.keyMaker(x1, y1, x1 - sLength, y1);
      sideKey2 = this.keyMaker(x2, y2, x2 - sLength, y2);
      sideKey3 = this.keyMaker(x1 - sLength, y1, x2 - sLength, y2);

      squareFound = this.existingLines.has(sideKey1) && this.existingLines.has(sideKey2) && this.existingLines.has(sideKey3);
      if (squareFound) {
        this.Squares.push(new Square(x1, y1, x2, y2, x2 - sLength, y2, x1 - sLength, y1));
        squareFoundNum++;
      }

    } else if (y1 == y2) {
      //Checking if connections exists below
      sideKey1 = this.keyMaker(x1, y1, x1, y1 + sLength);
      sideKey2 = this.keyMaker(x2, y2, x2, y2 + sLength);
      sideKey3 = this.keyMaker(x1, y1 + sLength, x2, y2 + sLength);

      squareFound = this.existingLines.has(sideKey1) && this.existingLines.has(sideKey2) && this.existingLines.has(sideKey3);
      if (squareFound) {
        this.Squares.push(new Square(x1, y1, x2, y2, x2, y2 + sLength, x1, y1 + sLength));
        squareFoundNum++;
      }

      //Checking if connections exists top
      sideKey1 = this.keyMaker(x1, y1, x1, y1 - sLength);
      sideKey2 = this.keyMaker(x2, y2, x2, y2 - sLength);
      sideKey3 = this.keyMaker(x1, y1 - sLength, x2, y2 - sLength);

      squareFound = this.existingLines.has(sideKey1) && this.existingLines.has(sideKey2) && this.existingLines.has(sideKey3);
      if (squareFound) {
        this.Squares.push(new Square(x1, y1, x1, y1 - sLength, x2, y2 - sLength, x2, y2));
        squareFoundNum++;
      }

    }

    return squareFoundNum;

  }

  draw() {

    var existingLines = Array.from(this.existingLines.values());

    this.Players[this.currentPlayer].draw();

    for(var i = 0; i < this.dots.length; i++) {
      this.dots[i].draw();
    }

    for (var i = 0; i < existingLines.length; i++) {
      existingLines[i].draw();
    }

    for (var i = 0; i < this.Squares.length; i++) {
      this.Squares[i].draw();
    }
  }
}
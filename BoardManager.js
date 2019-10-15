class BoardManager {
  constructor() {
    this.existingLines = new Map();
    this.Squares = [];
  }

  createLine(x1, y1, x2, y2) {
    let lineKey = this.keyMaker(x1, y1, x2, y2);

    if (this.existingLines.has(lineKey)) {
      return -1;
    } else {
      this.existingLines.set(lineKey, new Line(x1, y1, x2, y2, false));
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
    var lineArray = Array.from(this.existingLines.values());

    for (var i = 0; i < lineArray.length; i++) {
      lineArray[i].draw();
    }

    for (var i = 0; i < this.Squares.length; i++) {
      this.Squares[i].draw();
    }
  }
}
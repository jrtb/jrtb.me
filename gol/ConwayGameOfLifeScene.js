class ConwayGameOfLifeScene extends Phaser.Scene {
  constructor() {
    super({ key: "ConwayGameOfLifeScene" });

    this.timer = 0; // Initialize timer to keep track of time elapsed
    this.delay = 10; // Delay in milliseconds (3 seconds in this example)

    this.numRows = 200;
    this.numCols = 200;
    this.gridSize = 2;

    this.gameGrid = [];
  }

  create() {
    this.initGrid();
    this.rectangleGroup = this.add.group();
    this.drawGridOnCanvas();
  }

  initGrid() {
    for (let y = 0; y < this.numRows; y++) {
      let row = [];
      for (let x = 0; x < this.numCols; x++) {
        const value = Math.random() < 0.2;
        row.push(value);
      }
      this.gameGrid.push(row);
    }
  }

  drawGridOnCanvas() {
    // remove all current rectangles
    if (this.rectangleGroup !== undefined) {
      this.rectangleGroup.clear(true, true);
    }

    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numRows; x++) {
        if (this.gameGrid[x][y] === true) {
          // create a rectangle at this location and add it to a group to keep track
          this.rectangleGroup.add(
            this.add.rectangle(
              this.gridSize / 2 + x * this.gridSize,
              this.gridSize / 2 + y * this.gridSize,
              this.gridSize,
              this.gridSize,
              0xff0000
            )
          );
        }
      }
    }
  }

  shouldBeAliveNextRound(x, y) {
    /*
    -1,-1   0,-1    +1,-1
    -1,0    xxxx    +1,0
    -1,+1   0,+1    +1,+1        
    */

    // make sure the gameGrid is defined before checking any values within
    // todo: this check may not be necesary
    if (this.gameGrid === undefined) {
      return false;
    }

    // bounds check the coordinates and return false if out of bounds
    if (x < 0 || y < 0 || x >= this.numCols || y >= this.numRows) {
      return false;
    }

    var shouldBeAliveNextRound = false;
    var numberOfNeighbors = 0;

    var thisCellIsAlive = this.gameGrid[x][y];

    if (x > 0 && y > 0) {
      if (this.gameGrid[x - 1][y - 1] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (y > 0) {
      if (this.gameGrid[x][y - 1] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (x < this.numCols - 1 && y > 0) {
      if (this.gameGrid[x + 1][y - 1] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (x > 0) {
      if (this.gameGrid[x - 1][y] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (x < this.numCols - 1) {
      if (this.gameGrid[x + 1][y] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (x > 0 && y < this.numRows - 1) {
      if (this.gameGrid[x - 1][y + 1] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (y < this.numRows - 1) {
      if (this.gameGrid[x][y + 1] === true) {
        numberOfNeighbors += 1;
      }
    }
    if (x < this.numCols - 1 && y < this.numRows - 1) {
      if (this.gameGrid[x + 1][y + 1] === true) {
        numberOfNeighbors += 1;
      }
    }

    if (thisCellIsAlive && (numberOfNeighbors == 2 || numberOfNeighbors == 3)) {
      shouldBeAliveNextRound = true;
    }

    if (!thisCellIsAlive && numberOfNeighbors == 3) {
      shouldBeAliveNextRound = true;
    }

    return shouldBeAliveNextRound;
  }

  updateGrid() {
    // create a deep copy of the gameGrid
    var newGrid = JSON.parse(JSON.stringify(this.gameGrid));

    // determine state of each cell in the grid and record in temp array
    // do this so that each cell's next state is determined all in one tick
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numRows; x++) {
        newGrid[x][y] = this.shouldBeAliveNextRound(x, y);
      }
    }

    this.gameGrid = JSON.parse(JSON.stringify(newGrid));

    this.drawGridOnCanvas();
  }

  update(time, delta) {
    // Update timer with time elapsed since last frame
    this.timer += delta;

    // Check if the delay has elapsed
    if (this.timer >= this.delay) {
      this.updateGrid();

      // Reset timer
      this.timer -= this.delay;
    }
  }
}

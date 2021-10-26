class SudokuSolver {

  // Validates a puzzle string
  validate(puzzleString) {
    if(puzzleString.length !== 81){
      return false;
    }
    let chars = [...puzzleString];
    for(let c of chars){
      if(isNaN(parseInt(c)) && c !== '.'){
        return false;
      }      
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    value = `${value}`;
    // For column numbers
    for(let i = 0 ; i < 9; i ++){
      let index = this.getIndex(row, i);
            
      // if it is already present in current row, then placement is not possible.
      if(puzzleString[index] === value){
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    value = `${value}`;
    // For row numbers
    for (let i = 0; i < 9; i++) {
      let index = this.getIndex(i, column);
      console.log(value, "With", puzzleString[index]);
      // if it is already present in current column, then placement is not possible.
      if (puzzleString[index] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    value = `${value}`;
    let rank = this.getRankOrStack(row);
    let stack = this.getRankOrStack(column);

    let rowPlus = rank * 3;
    let colPlus = stack * 3;

    for(let i = 0 ; i < 3; i ++){
      for(let j = 0; j < 3; j ++){
        let index = this.getIndex(i + rowPlus, j + colPlus);
        
        if(puzzleString[index] === value){
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {

    let toSolveIndex = puzzleString.indexOf('.');

    let row = Math.floor(toSolveIndex/9);

    let column = (toSolveIndex%9);

    let possibleNext = false;
    for(let i = 1; i < 9; i ++){
      // i is number to be filled/checked.

      if(this.checkRowPlacement(puzzleString, row, column, i) && 
      this.checkColPlacement(puzzleString, row, column, i) &&
      this.checkRegionPlacement(puzzleString, row, column, i)){
        possibleNext = true;

        // If placement is possible, then place it and call recursively.
        var possibleString = new String(puzzleString);
        let indexToFill = this.getIndex(row, column);
        possible[indexToFill] = `${i}`;

        let checkDeep = solve(possibleString);

        // If recursive solution is not possible, that means this number doesn't belong here.
        if(!checkDeep){
          possibleNext = false;
          continue;
        }else{
          // If recursive solution is possible, return the solution.
          return checkDeep;
        }

      }
    }
    if(!possibleNext){
      return false;
    }
  }

  getIndex(row, column){
    return (9*row)+column;
  }

  getRankOrStack(cordinate){
    return Math.floor(cordinate/3);
  }
}

module.exports = SudokuSolver;


'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body;      

      if(!puzzle || !coordinate || !value){
        return res.json({ error: "Required field(s) missing" });
      }

      value = parseInt(value);

      if(puzzle.length !== 81){
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if(!solver.validate(puzzle)){
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      if( value < 1 || value > 9  || isNaN(value)){
        return res.json({ error: 'Invalid value' });
      }

      if(!solver.validateCordinate(coordinate)){
        return res.json({ error: 'Invalid coordinate' });
      }

      let result = solver.checkAllPlacement(puzzle, coordinate, value);

      return res.json(result);


    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let {puzzle} = req.body;

      if(!puzzle){
        return res.json({ error: 'Required field missing'})
      }

      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }


      if(solver.validate(puzzle)){
        let result = solver.solve(puzzle);
        if(result === false){
          return res.json({ error: 'Puzzle cannot be solved' });
        }else{
          return res.json({solution: result});
        }

      }
      return res.json({ error: 'Invalid characters in puzzle' });
    });
};

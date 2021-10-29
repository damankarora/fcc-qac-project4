'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body;      

      if(!puzzle || !coordinate || !value){
        return res.status(400).json({ error: "Required field(s) missing" });
      }

      value = parseInt(value);


      try{
        solver.validate(puzzle);
        if (value < 1 || value > 9 || isNaN(value)) {
          return res.status(400).json({ error: 'Invalid value' });
        }

        if (!solver.validateCordinate(coordinate)) {
          return res.status(400).json({ error: 'Invalid coordinate' });
        }

        let result = solver.checkAllPlacement(puzzle, coordinate, value);

        return res.json(result);


      }catch(err){
        return res.status(400).json({ error: err.message });
      }

      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let {puzzle} = req.body;

      if(!puzzle){
        return res.status(400).json({ error: 'Required field missing'})
      }

      try{
        solver.validate(puzzle);
        let result = solver.solve(puzzle);
        if (result === false) {
          return res.json({ error: 'Puzzle cannot be solved' });
        } else {
          return res.json({ solution: result });
        }
      }catch(err){
        return res.json({error: err.message});
      }

      
      // if(validationResult === true){
        

      // } else if (validationResult === "Puzzle cannot be solved"){
      //   return res.json({
      //     error: "Puzzle cannot be solved"});
      // }
      // return res.json({ error: 'Invalid characters in puzzle' });
    });
};

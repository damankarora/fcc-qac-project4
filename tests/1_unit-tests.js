const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('UnitTests', () => {
    suite('Testing Validate method', ()=>{
        test('With empty string => false', ()=>{
            assert.equal(solver.validate(''), false);
        });

        test('With valid String => true', ()=>{
            assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), true);
        })

        test('With invalid String => false', ()=>{
            assert.equal(solver.validate('IAmABadString'), false);
        });
    });

    suite('Testing row placement method', ()=>{
        test('When number can be placed => true', ()=>{
            assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                0, 1, 3), true);
            
            assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 
                8, 8, 8), true);
        })

        test('When number cannot be placed => false', ()=>{
            assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.', 
                0, 1, 2), false);
            assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                8, 8, 1), false);            
        })
    });

    suite('Testing column placement method', ()=>{
        test('When number can be placed => true', ()=>{
            assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                1, 0, 9), true);
            assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                1, 5, 8), true);
        })
        test('When number cannot be placed => false', ()=>{
            assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
                4, 0, 1), false);
        })
    })
});

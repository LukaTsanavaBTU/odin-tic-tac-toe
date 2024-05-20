/*
Create player factory function 
Create arrays for each player x
Create variable for which mark the player uses x
Create score variable for each player x
Create name variable for each player x
Add functions for displaying and modifying variables x

Create module for gameboard
Create variables for each player x
Create variable for entire gameboard x
Create variable for array of arrays of each winning condition x
Add a function for checking agains winning conditions or ties 

Create game module which will include the gameboard module and also handle drawing the html
*/

function player(name="Player", mark) {
    let score = 0;
    let placedMarks = new Array(9).fill(false);
    const showInfo= function() {
        return {name, mark, score, placedMarks};
    };
    const resetScore = function() {
        score = 0;
    }
    const addScore = function() {
        return ++score;
    }
    const setName = function(newName) {
        name = newName;
    };
    const resetMarks = function() {
        placedMarks = new Array(9).fill(false);
    };
    const placeMark = function(index) {
        placedMarks[index] = true;
        return placedMarks;
    }
    return {showInfo, resetScore, addScore, setName, resetMarks, placeMark};
}

const gameboard = (function(playerFunc) {
    const player1 = playerFunc("Player 1", "x");
    const player2 = playerFunc("Player 2", "o");
    let placedMarks = new Array(9).fill(false);
    const winningBoards = [
        [true, true, true, 
        false, false, false, 
        false, false, false],
        [false, false, false, 
        true, true, true, 
        false, false, false],
        [false, false, false, 
        false, false, false, 
        true, true, true],
        [false, false, false, 
        false, false, false, 
        false, false, false],
        [true, false, false, 
        true, false, false, 
        true, false, false],
        [false, true, false, 
        false, true, false, 
        false, true, false],
        [false, false, true, 
        false, false, true, 
        false, false, true],
        [true, false, false, 
        false, true, false, 
        false, false, true],
        [false, false, true, 
        false, true, false, 
        true, false, false],
    ];
    const tieBoard = new Array(9).fill(true);

})(player);
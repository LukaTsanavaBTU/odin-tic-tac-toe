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
Add a function for checking agains winning conditions or ties x
Add a function for resetting the game x
Add a function for handling game results x

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
        true, false, false]
    ];
    const tieBoard = new Array(9).fill(true);
    const calcPlacedMarks = function() {
        return placedMarks = placedMarks.map((value, index) => {
            return player1.showInfo().placedMarks[index] || player2.showInfo().placedMarks[index];
        });
    };
    const checkWin = function() {
        if (winningBoards.some( (value) => {
            return value.toString() === player1.showInfo().placedMarks.toString()
        })) {
            return player1.showInfo().name;
        } else if (winningBoards.some( (value) => {
            return value.toString() === player2.showInfo().placedMarks.toString();
        })) {
            return player2.showInfo().name;
        } else if (placedMarks.toString() === tieBoard.toString()) {
            return "Tie";
        } else {
            return "InProgress";
        }
    };
    const hardReset = function() {
        player1.resetScore()
        player1.resetMarks();
        player2.resetScore();
        player2.resetMarks();
        calcPlacedMarks();
    };
    const softReset = function() {
        player1.resetMarks();
        player2.resetMarks();
        calcPlacedMarks();
    };
    const handleResult = function() {
        const result = checkWin();
        if (result === "Player 1") {
            player1.addScore();
        } else if (result === "Player 2") {
            player2.addScore();
        }
        if (result !== "InProgress") {
            softReset();
        }
    };
    return {player1, player2, checkWin, hardReset, softReset, handleResult, calcPlacedMarks};
})(player);

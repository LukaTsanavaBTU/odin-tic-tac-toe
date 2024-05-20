/*
Create player factory function
Create arrays for each player x
Create variable for which mark the player uses x
Create score variable for each player x
Create name variable for each player x
Add functions for displaying and modifying variables

Create module for gameboard
Create variables for each player
Create variable for entire gameboard
Create variable for array of arrays of each winning condition
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
}
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
    const compareWithWinning = function(arr) {
        return winningBoards.some((winningArray) => {
            return winningArray.every((value, index) => {
                if ((value === false) || (value === true && value === arr[index])) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    };
    const checkWin = function() {
        if (compareWithWinning(player1.showInfo().placedMarks)) {
            return player1.showInfo().name;
        } else if (compareWithWinning(player2.showInfo().placedMarks)) {
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

const gameLoop = (function(board) {
    const boardDivs = document.querySelectorAll(".grid-container>div");
    const p1ScoreSpan = document.querySelector(".p1-score");
    const p2ScoreSpan = document.querySelector(".p2-score");
    let turn = 1;
    const start = function() {
        boardDivs.forEach((div) => {
            div.addEventListener("click", (e) => {
                if (div.textContent !== ""){
                    return;
                }
                if (turn === 1){
                    board.player1.placeMark(parseInt(div.dataset.index));
                    div.textContent = "X";
                    turn = 2;
                } else {
                    board.player2.placeMark(parseInt(div.dataset.index));
                    div.textContent = "O";
                    turn = 1;
                }
                board.calcPlacedMarks();
                handleResult();
            })
        });
    };
    const updateScores = function() {
        p1ScoreSpan.textContent = board.player1.showInfo().score;
        p2ScoreSpan.textContent = board.player2.showInfo().score;
    };
    const resetBoard = function() {
        turn = 1;
        boardDivs.forEach((div) => {
            div.textContent = "";
        });
        boardDivs.forEach((div) => {div.classList.remove("noclick")});
    };
    const handleResult = function() {
        const result = board.checkWin();
        if (result !== "InProgress") {
            board.handleResult();
            updateScores();
            boardDivs.forEach((div) => {div.classList.add("noclick")});
            setTimeout(resetBoard, 1000);
        }

    };
    return {start};
})(gameboard);

gameLoop.start();

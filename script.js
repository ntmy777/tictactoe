let gameboard = (function () {
    const board = [];
    const setBoardSize = function (size = 3) {
        return size;
    };
    const setBoard = function () {
        for (let i = 0; i < setBoardSize(3); i++) {
            board[i] = [];
            for (let j = 0; j < setBoardSize(3); j++) {
                board[i].push("");
            }
        }
    };

    const getBoard = function () {
        return board;
    };

    const setBoardValue = function (row, column, value) {
        board[row][column] = value;
        gameController.playerTurn();
    };

    const resetBoard = function () {
        setBoard();
    }

    return { setBoardSize, setBoard, getBoard, setBoardValue, resetBoard };
})();

let player = {
    playerA: { name: "A", mark: "O" },
    playerB: { name: "B", mark: "X" },
    getName: function (winPlayer) {
        var winName = "";
        if (winPlayer === player.playerA.mark) {
            winName = player.playerA.name;
        }
        else {
            winName = player.playerB.name;
        }

        return winName;
    }
};

let gameController = (function () {
    // game flow
    var currentPlayer = player.playerA;
    const playerTurn = function () {
        if (currentPlayer === player.playerA) {
            currentPlayer = player.playerB;
        }
        else {
            currentPlayer = player.playerA;
        }
    };

    const playerLabel = function () {
        return `player ${currentPlayer.name}'s turn`
    };

    var marking = false;
    const getMarked = function () {
        return marking;
    };

    const setMarked = function (marked) {
        marking = marked;
    };

    const markIndex = function (row, column) {
        //write condition to check whether O/X at the selected position
        if (gameboard.getBoard()[row][column] != "O" && gameboard.getBoard()[row][column] != "X" && row < gameboard.getBoard().length && column < gameboard.getBoard().length) {
            gameboard.setBoardValue(row, column, currentPlayer.mark);
            setMarked(true);
            winCondition();
            tie();
            return screenController.label();
        }
        else {
            window.alert("unable to mark this position, please try again");
            return screenController.label();
        }
    };

    const winCondition = function () {
        //horizontal
        var gameWinner = "";
        let outerRow = false;
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            if (gameboard.getBoard()[i][0] !== "") {
                var rowFirstMark = gameboard.getBoard()[i][0];
                //get row player's name
                var rowPlayer = player.getName(rowFirstMark);

                let innerRow = true;
                for (let j = 0; j < gameboard.getBoard().length - 1; j++) {
                    if (rowFirstMark !== gameboard.getBoard()[i][j + 1]) {
                        innerRow = false;
                    }
                }
                if (innerRow) {
                    outerRow = true;
                    gameWinner = rowPlayer;
                }
            }
        }

        // outer is to keep track of whether there is any horizxontal solution at all
        // while the inner tries to see if the current horizontal has a solution
        // how do u make outer = true, if there is a soution at all

        //vertical
        var outerVertical = false;
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            if (gameboard.getBoard()[0][i] !== "") {
                var columnFirstMark = gameboard.getBoard()[0][i];

                //get column player's name
                var colPlayer = player.getName(columnFirstMark);

                var innerVertical = true;
                for (let j = 0; j < gameboard.getBoard().length - 1; j++) {
                    if (columnFirstMark !== gameboard.getBoard()[j + 1][i]) {
                        innerVertical = false;
                    }
                }
                if (innerVertical) {
                    outerVertical = true;
                    gameWinner = colPlayer;
                }
            }
        }

        //diagonal upper left to lower right
        if (gameboard.getBoard()[0][0] !== "") {
            var firstMark = gameboard.getBoard()[0][0];
            var diagonalLeftToRight = true;
            for (let i = 1; i < gameboard.getBoard().length; i++) {
                if (firstMark !== gameboard.getBoard()[i][i]) {
                    diagonalLeftToRight = false;
                }
            }
            if (diagonalLeftToRight) {
                //get column player's name
                var firstDiagonalPlayer = player.getName(firstMark);
                gameWinner = firstDiagonalPlayer;
            }
        }

        if (gameboard.getBoard()[0][gameboard.getBoard().length - 1] !== "") {
            var lastMark = gameboard.getBoard()[0][gameboard.getBoard().length - 1];
            var diagonalRightToLeft = true;
            for (let i = 1; i < gameboard.getBoard().length; i++) {
                // diagonal upper right to lower left
                if (lastMark !== gameboard.getBoard()[i][gameboard.getBoard().length - 1 - i]) {
                    diagonalRightToLeft = false;
                }
            }
            if (diagonalRightToLeft) {
                //get column player's name
                var lastDiagonalPlayer = player.getName(lastMark);
                gameWinner = lastDiagonalPlayer;
            }
        }

        if (diagonalLeftToRight || diagonalRightToLeft || outerRow || outerVertical) {
            window.alert(`player ${gameWinner} win`);
            currentPlayer = player.playerA;
            setMarked(false);
            return screenController.initialize();
        }
    };

    const tie = function () {
        var emptySlot = false;
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            for (let j = 0; j < gameboard.getBoard().length; j++) {
                if (gameboard.getBoard()[i][j] === "") {
                    emptySlot = true;
                }
            }
        }

        if (!emptySlot) {
            window.alert(`tie!`);
            currentPlayer = player.playerA;
            setMarked(false);
            return screenController.initialize();
        }
    };

    return { playerTurn, playerLabel, markIndex, winCondition, tie, getMarked };
})();

let screenController = (function () {
    // display array and player's turn 
    const container = document.querySelector(".container");
    const label = function () {
        let labelDisplay = document.querySelector(".label");
        labelDisplay.textContent = gameController.playerLabel();
        // console.log(gameboard.getBoard());
    }

    const updateBoard = function (e) {
        const i = parseInt(e.target.dataset.row);
        const j = parseInt(e.target.dataset.column);
        gameController.markIndex(i, j);
        if (gameController.getMarked()) {
            e.target.textContent = gameboard.getBoard()[i][j];
        };
    }

    const initialize = function () {
        gameboard.resetBoard();
        // label();
        container.textContent="";
        const label = document.querySelector(".label");
        container.style.gridTemplateColumns = `repeat(${(gameboard.getBoard().length)}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gameboard.getBoard().length}, 1fr)`;

        for (let i = 0; i < gameboard.getBoard().length; i++) {
            for (let j = 0; j < gameboard.getBoard().length; j++) {
                const grid = document.createElement("div");
                grid.classList.add("boardCell");
                grid.textContent = gameboard.getBoard()[i][j];
                grid.dataset.row = i;
                grid.dataset.column = j;
                grid.addEventListener('click', (e) => {
                    updateBoard(e);
                });
                container.appendChild(grid);
            }
        }
    };

    return { label, initialize, updateBoard };
})();

screenController.initialize();



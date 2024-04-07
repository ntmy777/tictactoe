let gameboard = (function () {
    const board = [];
    const layout = function () {
        // var container = document.querySelector(".container");
        // container.style.gridTemplateColumns=`repeat(${Math.sqrt(this.board)}, 1fr)`;
        // container.style.gridTemplateRows=`repeat(${Math.sqrt(this.board)}, 1fr)`;
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push("");
            }
            // const grid = document.createElement("grid");
            // grid.className("layout");
            // container.appendChild(grid);
        }
    };

    const getBoard = function () {
        // console.log(this.board);
        return board;
    };

    const setBoard = function (row, column, value) {
        board[row][column] = value;
        gameController.playerTurn();
    };

    const resetBoard = function(){
        size = [];
        layout();
    }

    return { layout, getBoard, setBoard, resetBoard};
})();

let player = {
    playerA: { name: "A", mark: "O" },
    playerB: { name: "B", mark: "X" },
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

    const markIndex = function (row, column) {
        //write condition to check whether O/X at the selected position
        if (gameboard.getBoard()[row][column] != "O" && gameboard.getBoard()[row][column] != "X" && row<gameboard.getBoard().length && column<gameboard.getBoard().length) {
            gameboard.setBoard(row, column, currentPlayer.mark);
            console.log(winCondition());
            return screenController.label();
        }
        else {
            console.log("unable to mark this position, please try again");
            return screenController.label();
        }
    };

    const winner = function (winPlayer) {
        var winName = "";
        if (winPlayer === player.playerA.mark) {
            winName = player.playerA.name;
        }
        else {
            winName = player.playerB.name;
        }

        return winName;
    };

    const winCondition = function () {
        //horizontal
        var gameWinner = "";
        let outerRow = false;
        for (let i = 0; i < gameboard.getBoard().length; i++) {
            if (gameboard.getBoard()[i][0] !== "") {
                var rowFirstMark = gameboard.getBoard()[i][0];
                //get row player's name
                var rowPlayer = winner(rowFirstMark);

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
                var colPlayer = winner(columnFirstMark);

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
                var firstDiagonalPlayer = winner(firstMark);
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
                var lastDiagonalPlayer = winner(lastMark);
                gameWinner = lastDiagonalPlayer;
            }
        }

        if (diagonalLeftToRight || diagonalRightToLeft || outerRow || outerVertical) {
            console.log(`player ${gameWinner} win`);
            currentPlayer = player.playerA;
            return gameboard.resetBoard();
        }
    };
    return { playerTurn, playerLabel, markIndex, winCondition };
})();

let screenController = (function () {
    // display array and player's turn 
    const label = function () {
        console.log(gameController.playerLabel());
        console.log(gameboard.getBoard());
    }
    return { label };
})();

gameboard.resetBoard();
screenController.label();


let gameboard = (function () {
    const size = [];
    const layout = function () {
        // var container = document.querySelector(".container");
        // container.style.gridTemplateColumns=`repeat(${Math.sqrt(this.size)}, 1fr)`;
        // container.style.gridTemplateRows=`repeat(${Math.sqrt(this.size)}, 1fr)`;
        for (let i = 0; i < 9; i++) {
            size.push(i);
            // const grid = document.createElement("grid");
            // grid.className("layout");
            // container.appendChild(grid);
        }
    };

    const getSize = function () {
        // console.log(this.size);
        return size;
    };

    const setSize = function (index, value) {
        size[index] = value;
        gameController.playerTurn();
    };

    return { layout, getSize, setSize };
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
        return `player ${currentPlayer.name}'s turn, ${currentPlayer.mark}`
    };

    const markIndex = function (index) {
        for (let i = 0; i < gameboard.getSize().length; i++) {
            if (i === index) {
                //write condition to check whether O/X at the selected position
                if (gameboard.getSize()[i] != "O" && gameboard.getSize()[i] != "X") {
                    gameboard.setSize(i, currentPlayer.mark);
                    return screenController.label();
                }
                else {
                    console.log("unable to mark this position, please try again");
                    return screenController.label();
                }
                // break;
            }
        }
    };
    return { playerTurn, playerLabel, markIndex };
})();

let screenController = (function () {
    // display array and player's turn 
    const label = function () {
        console.log(gameController.playerLabel());
        console.log(gameboard.getSize());
    }
    return { label };
})();

gameboard.layout();
screenController.label();

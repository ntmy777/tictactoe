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
        console.log(size);
    };

    const getSize = function(){
        // console.log(this.size);
        return size;
    };

    const setSize = function(index, value){
        size[index] = value;
        gameController.playerTurn();
        console.log(getSize());
        console.log(gameController.playerLabel());
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
    currentPlayer = Object.assign({}, currentPlayer);

    const playerTurn = function () {
        // Object.values(player).forEach(function (value) {
            if(currentPlayer.name === "A"){
                currentPlayer.name = "B";
            }
            else{
                currentPlayer.name = "A";
            }
        // });
    };

    const playerLabel = function(){
        return `player ${currentPlayer.name}'s turn`};

    const markIndex = function(index){
        for(let i=0; i<gameboard.getSize(); i++){
            if(i === index){
                //write condition to check whether O/X at the selected position


                gameboard.setSize(i, currentPlayer.mark);
                return gameboard.getSize();
            }
        }
        return gameboard.getSize();
    };

    return {playerTurn, playerLabel, markIndex};
})();

gameboard.layout();
// gameController.playerLabel;
gameboard.setSize(0, "o");
console.log(gameboard.getSize());

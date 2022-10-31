// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn

const gameStatus = document.querySelector('.game--status');
const win_draw = document.querySelectorAll('.cell');

let gameActive = 1;
let playerActive = "X";
let gameArray = ["","","","","","","","",""];

const winningMessage = () => `Player ${playerActive} has won`;
const drawMessage = () => `Ohh!! Match Result Draww`;
const currentTurn = () => `It's ${playerActive} turn Now`;

gameStatus.innerHTML = currentTurn();

const winningOutcomes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let winningArray;

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameArray[clickedCellIndex] = playerActive;
    clickedCell.innerHTML = playerActive;
}

function handlePlayerChange() {
    playerActive = playerActive === "X" ? "O" : "X";
    gameStatus.innerHTML = currentTurn();
}

function handleResultValidation(){

    let roundWon =false;

    for(let i=0; i <=7; i++){

        const winOut = winningOutcomes[i];
        let a = gameArray[winOut[0]];
        let b = gameArray[winOut[1]];
        let c = gameArray[winOut[2]];


        if(a === '' || b === '' || c === ''){
            continue;
        }
    
    
        if( a === b && b === c){
            roundWon = true;
            winningArray = winOut;
            break;
        }
    }
   
    if(roundWon){
        gameStatus.classList.add('win');
        winningArray.forEach((e) => {
            console.log(win_draw[e]);
            win_draw[e].classList.add('winner_boxx');
        })
        gameStatus.innerHTML = winningMessage();
        gameActive = 0;
        return;
    }

    let roundDraw = !gameArray.includes("");
    if(roundDraw){
        gameStatus.classList.add('draw');
        gameStatus.innerHTML = drawMessage();
        gameActive = 0;
        return;
    }

    handlePlayerChange();    

}

// function winner_boxx(){
//     win_draw.forEach((e) => {
//         const cell
//     })
// }

function handleClick(e){
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));

    if(gameArray[clickedCellIndex] !== "" || gameActive === 0){
        return;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    winningArray.forEach((e) => {
        console.log(win_draw[e]);
        win_draw[e].classList.remove('winner_boxx');
    });
    gameActive = 1;
    playerActive = "X";
    gameArray = ["","","","","","","","",""];
    winningArray;
    gameStatus.innerHTML = currentTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    gameStatus.classList.remove('win','draw');
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

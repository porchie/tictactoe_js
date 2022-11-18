import {TicTacToeCell} from "./tictactoecell.js";

const tictactoeArray = [
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell
];
const btnArr = [];
let lastCap = -1;
let playerStr = "";
function initialize()
{
    document.getElementById("tictactoe-board").style.display = "none";
    document.getElementById("btn-o").addEventListener("click",() => pickOption("O"));
    document.getElementById("btn-x").addEventListener("click",() => pickOption("X"));

    for(let i = 0;i<9;i++)
    {
        let b = document.getElementById("btn-"+i);
        btnArr.push(b);
        b.addEventListener("click", () => captureTile(i,playerStr));
    }
}

function reset()
{
    tictactoeArray.forEach(e => e.reset());
}

function captureTile(idx, tileIn)
{   
    if ((idx !== lastCap) && 
    tictactoeArray[idx].capture(tileIn))
    {
        lastCap = idx;
    }
    renderBoard();
}

function renderBoard()
{
    document.getElementById("tictactoe-board").style.display = "block";
    for(let i = 0;i<9;i++)
    {
        btnArr[i].innerHTML = tictactoeArray[i].getCellVal();
    }
}

function pickOption(knotOrCross)
{
    playerStr = knotOrCross;   
    document.getElementById("option").style.display = "none";
    renderBoard();
}

function check()
{

}

window.addEventListener("load",()=>initialize());





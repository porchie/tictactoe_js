import {TicTacToeCell} from "./tictactoecell.js";

const tictactoeArray = [
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell
];
const btnArr = [];
let lastCap = -1;
let playerStr = "";
let cpuStr = "";
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
    cpuStr = (playerStr === 'X') ? 'O' : 'X';
    renderBoard();
}

function check()
{
    let playerWin = 
    //horizontal
    isSameVal(tictactoeArray[0],tictactoeArray[1],tictactoeArray[2],playerStr) ||
    isSameVal(tictactoeArray[3],tictactoeArray[4],tictactoeArray[5],playerStr) ||
    isSameVal(tictactoeArray[6],tictactoeArray[7],tictactoeArray[8],playerStr) ||
    //vertical
    isSameVal(tictactoeArray[0],tictactoeArray[3],tictactoeArray[6],playerStr) ||
    isSameVal(tictactoeArray[1],tictactoeArray[4],tictactoeArray[7],playerStr) ||
    isSameVal(tictactoeArray[2],tictactoeArray[5],tictactoeArray[8],playerStr) ||
    //diagonal
    isSameVal(tictactoeArray[0],tictactoeArray[4],tictactoeArray[8],playerStr) ||
    isSameVal(tictactoeArray[2],tictactoeArray[4],tictactoeArray[6],playerStr);
    if(!playerWin) //check for cpuWin
    {
        let cpuWin = //horizontal
        isSameVal(tictactoeArray[0],tictactoeArray[1],tictactoeArray[2],cpuStr) ||
        isSameVal(tictactoeArray[3],tictactoeArray[4],tictactoeArray[5],cpuStr) ||
        isSameVal(tictactoeArray[6],tictactoeArray[7],tictactoeArray[8],cpuStr) ||
        //vertical
        isSameVal(tictactoeArray[0],tictactoeArray[3],tictactoeArray[6],cpuStr) ||
        isSameVal(tictactoeArray[1],tictactoeArray[4],tictactoeArray[7],cpuStr) ||
        isSameVal(tictactoeArray[2],tictactoeArray[5],tictactoeArray[8],cpuStr) ||
        //diagonal
        isSameVal(tictactoeArray[0],tictactoeArray[4],tictactoeArray[8],cpuStr) ||
        isSameVal(tictactoeArray[2],tictactoeArray[4],tictactoeArray[6],cpuStr);
        if(cpuWin)
        {
            //cpu won
        }
    }
    else
    {
        //player won
    }
}

function isSameVal(cell1,cell2,cell3,str)
{
    return cell1.getCellVal() === str && cell1.getCellVal() === cell2.getCellVal() && cell1.getCellVal() === cell3.getCellVal();
}

window.addEventListener("load",()=>initialize());





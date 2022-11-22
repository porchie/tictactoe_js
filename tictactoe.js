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
let isEnded = false;
function initialize()
{
    document.getElementById("tictactoe-board").style.display = "none";
    document.getElementById("btn-o").addEventListener("click",() => pickOption("O"));
    document.getElementById("btn-x").addEventListener("click",() => pickOption("X"));
    document.getElementById("btn-reset").addEventListener("click",() => reset());
    for(let i = 0;i<9;i++)
    {
        let b = document.getElementById("btn-"+i);
        btnArr.push(b);
        b.addEventListener("click", () => captureTile(i,playerStr));
    }
}

function reset()
{
    isEnded = false;
    tictactoeArray.forEach(e => e.reset());
    btnArr[lastCap].classList.remove("cap-last");
    btnArr.forEach((e) => {
        if(e.classList.contains("cap-1")) e.classList.remove("cap-1");
        if(e.classList.contains("cap-2")) e.classList.remove("cap-2");
    });
    lastCap = -1;
    renderBoard();
}

function captureTile(idx, tileIn)
{   
    if(isEnded) return;
    if ((idx !== lastCap) && //not last turn captured tile
    tictactoeArray[idx].capture(tileIn)) 
    {
        if(lastCap >= 0) btnArr[lastCap].classList.remove("cap-last");
        lastCap = idx;
        btnArr[lastCap].classList.add("cap-last");
        checkWin();
        if(tileIn === playerStr && !isEnded) 
        {
            cpuAi();
            checkWin();
        }
    }
    if(tictactoeArray[idx].cappedOnce())
    {
        btnArr[idx].classList.add("cap-1")
    }
    else if (tictactoeArray[idx].isLocked())
    {
        btnArr[idx].classList.add("cap-2");
    }
    renderBoard();
}

function renderBoard()
{
    for(let i = 0;i<9;i++)
    {
        btnArr[i].innerHTML = tictactoeArray[i].getCellVal();
    }
}

function pickOption(knotOrCross)
{
    playerStr = knotOrCross;   
    document.getElementById("option").style.display = "none";
    document.getElementById("tictactoe-board").style.display = "";
    
    cpuStr = (playerStr === 'X') ? 'O' : 'X';
    renderBoard();
}

function checkWin()
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
            isEnded = true;
            //game ends
            console.log("u lost gg ez");
            //cpuwin
        }
    }
    else
    {
        isEnded = true;
        console.log("nice win bro");
        //game ends
        //players win

    }
}

function isSameVal(cell1,cell2,cell3,str)
{
    return cell1.getCellVal() === str && cell1.getCellVal() === cell2.getCellVal() && cell1.getCellVal() === cell3.getCellVal();
}

function cpuAi()
{
    let listOfPossibleMoves = [];
    for(let i = 0; i<tictactoeArray.length;i++)
    {
        if(i===lastCap) continue;
        if(tictactoeArray[i].isLocked()) continue;
        listOfPossibleMoves.push(i);
    }

    let rand = pickRandomFromArray(listOfPossibleMoves);
    captureTile(rand, cpuStr);
}

function pickRandomFromArray(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}

window.addEventListener("load",()=>initialize());





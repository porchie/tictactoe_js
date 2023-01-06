import {TicTacToeCell} from "./tictactoecell.js";

const tictactoeArray = [
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell,
    new TicTacToeCell,new TicTacToeCell,new TicTacToeCell
];
const board = document.querySelector("#tictactoe-board");
const btnArr = [];
let lastCap = -1;
let playerStr = "";
let cpuStr = "";
let isEnded = false;
function initialize()
{
    document.querySelector("#playfield").style.display = "none";
    document.querySelector("#btn-o").addEventListener("click",() => pickOption("O"));
    document.querySelector("#btn-x").addEventListener("click",() => pickOption("X"));
    document.querySelector("#btn-reset").addEventListener("click",() => reset());
    document.querySelector("#btn-choice").addEventListener("click",() => returnToOption())
    for(let i = 0;i<9;i++)
    {
        let b = document.querySelector(`#btn-${i}`);
        btnArr.push(b);
        b.addEventListener("click", () => captureTile(i,playerStr));
    }

    let allBtn = document.querySelectorAll(".btn");
    allBtn.forEach((btn) =>{
        btn.addEventListener("click", () => playAudio())
    });

}

function playAudio()
{
    let audio = document.querySelector("#audio");
    audio.play();
}
function reset()
{
    
    isEnded = false;
    if(board.classList.contains('win')) board.classList.remove('win');
    if(board.classList.contains('lose'))board.classList.remove('lose');
    if(board.classList.contains('tie'))board.classList.remove('tie');

    tictactoeArray.forEach(e => e.reset());
    if(lastCap >= 0)btnArr[lastCap].classList.remove("cap-last");
    btnArr.forEach((e) => {
        e.disabled = false;
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

function returnToOption()
{
    reset();
    playerStr = "";
    cpuStr = "";
    document.querySelector("#playfield").style.display = "none";
    document.querySelector("#option").style.display = "";
}

function pickOption(knotOrCross)
{
    playerStr = knotOrCross;   
    document.querySelector("#option").style.display = "none";
    document.querySelector("#playfield").style.display = "";
    
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
    if(playerWin) //player win
    {
        isEnded = true;
        btnArr.forEach(e => e.disabled = true);

        //game ends
        board.classList.add("win");
       //players win
    }
    else
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
            btnArr.forEach(e => e.disabled = true);
            //game ends
            board.classList.add("lose");
                        //cpuwin
        }
    }
    //tie
    let tie = true;
    for(let i = 0;i<8;i++)
    {
        if(!tictactoeArray[i].isLocked()) tie = false;
    }
    if(tie)
    {
        isEnded = true;
        btnArr.forEach(e => e.disabled = true);
        //game ends
        board.classList.add("tie");
    }
}

function isSameVal(cell1,cell2,cell3,str)
{
    return cell1.getCellVal() === str && cell1.getCellVal() === cell2.getCellVal() && cell1.getCellVal() === cell3.getCellVal();
}

function cpuAi()
{
    let normalizedArr = normalizeTwoLayer(tictactoeArray);

    ///win algo///
    //check if cpu can win, check this first since it can end game
    let cpuWin = possibleWin(cpuStr, normalizedArr);

    if(cpuWin != -1)
    {
        captureTile(cpuWin,cpuStr);
        return;
    }
    
    //check if player can win then block
    let plyWin = possibleWin(playerStr, normalizedArr);
    if(plyWin != -1)
    {
        captureTile(plyWin,cpuStr);
        return;
    }
    //random here
    let listOfPossibleMoves = [];
    for(let i = 0; i<tictactoeArray.length;i++)
    {
        if(i===lastCap) continue;
        if(tictactoeArray[i].isLocked()) continue;
        listOfPossibleMoves.push(i);
    }
    let rand = pickRandomFromArray(listOfPossibleMoves);
    captureTile(rand, cpuStr);
    return;
}

function possibleWin(tile, arr)
{
    if(tile === playerStr) //try and block by capturing the player's tile
    {
        //0
        if(lastCap !== 0 && 
        !tictactoeArray[0].isLocked() && 
        arr[0] === tile &&
        (arr[1] === tile || 
         arr[3] === tile ||
         arr[4] === tile))
        return 0;

        //1
        if(lastCap !== 1 && 
        !tictactoeArray[1].isLocked() && 
        arr[1] === tile &&
        (arr[0] === tile || 
         arr[2] === tile ||
         arr[4] === tile))
        return 1;

        //2
        if(lastCap !== 2 && 
        !tictactoeArray[2].isLocked() && 
        arr[2] === tile &&
        (arr[1] === tile || 
         arr[5] === tile ||
         arr[4] === tile))
        return 2;

        //3
        if(lastCap !== 3 && 
        !tictactoeArray[3].isLocked() && 
        arr[3] === tile &&
        (arr[0] === tile || 
         arr[6] === tile ||
         arr[4] === tile))
        return 3;

        //4
        if(lastCap !== 4 && 
        !tictactoeArray[4].isLocked() && 
        arr[4] === tile &&
        (arr[0] === tile || 
         arr[1] === tile || 
         arr[2] === tile ||
         arr[3] === tile || 
         arr[5] === tile ||
         arr[6] === tile ||
         arr[7] === tile || 
         arr[8] === tile))
        return 4;
        
        //5
        if(lastCap !== 5 && 
        !tictactoeArray[5].isLocked() && 
        arr[5] === tile &&
        (arr[2] === tile || 
         arr[8] === tile ||
         arr[4] === tile))
        return 5;
        
        //6
        if(lastCap !== 6 && 
        !tictactoeArray[6].isLocked() && 
        arr[6] === tile &&
        (arr[3] === tile || 
         arr[7] === tile ||
         arr[4] === tile))
        return 6;
        
        //7
        if(lastCap !== 7 && 
        !tictactoeArray[7].isLocked() && 
        arr[7] === tile &&
        (arr[6] === tile || 
         arr[8] === tile ||
         arr[4] === tile))
        return 7;
        
        //8
        if(lastCap !== 8 && 
        !tictactoeArray[8].isLocked() && 
        arr[8] === tile &&
        (arr[5] === tile || 
         arr[7] === tile ||
         arr[4] === tile))
        return 8;
    }

    //0
    if(lastCap !== 0 && !tictactoeArray[0].isLocked() && 
    ((arr[1] === tile && arr[2] === tile) || 
    (arr[3] === tile && arr[6] === tile)    ||
    (arr[4] === tile && arr[8] === tile)))
    return 0;

    //1
    if(lastCap !== 1 && !tictactoeArray[1].isLocked() && 
    ((arr[0] === tile && arr[2] === tile) || 
    (arr[4] === tile && arr[7] === tile)))
    return 1;

    //2
    if(lastCap !== 2 && !tictactoeArray[2].isLocked() && 
    ((arr[0] === tile && arr[1] === tile) || 
    (arr[5] === tile && arr[8] === tile)    ||
    (arr[4] === tile && arr[6] === tile)))
    return 2;

    //3
    if(lastCap !== 3 && !tictactoeArray[3].isLocked() && 
    ((arr[0] === tile && arr[6] === tile) || 
    (arr[4] === tile && arr[5] === tile)))
    return 3;

    //4
    if(lastCap !== 4 && !tictactoeArray[4].isLocked() && 
    ((arr[0] === tile && arr[8] === tile) || 
    (arr[5] === tile && arr[3] === tile)    ||
    (arr[2] === tile && arr[6] === tile)    ||
    (arr[1] === tile && arr[7] === tile)))
    return 4;

    //5
    if(lastCap !== 5 && !tictactoeArray[5].isLocked() && 
    ((arr[8] === tile && arr[2] === tile) || 
    (arr[4] === tile && arr[3] === tile)))
    return 5;

    //6
    if(lastCap !== 6 && !tictactoeArray[6].isLocked() && 
    ((arr[7] === tile && arr[8] === tile) || 
    (arr[3] === tile && arr[0] === tile)    ||
    (arr[4] === tile && arr[2] === tile)))
    return 6;

    //7
    if(lastCap !== 7 && !tictactoeArray[7].isLocked() && 
    ((arr[6] === tile && arr[8] === tile) || 
    (arr[4] === tile && arr[1] === tile)))

    return 7;

    //8
    if(lastCap !== 8 && !tictactoeArray[8].isLocked() && 
    ((arr[6] === tile && arr[7] === tile) || 
    (arr[4] === tile && arr[0] === tile)    ||
    (arr[5] === tile && arr[2] === tile)))
    return 8;

    //nowin
    return -1;
}





function normalizeTwoLayer(twoLayerArr)
{
    let arr = [];
    for(let i = 0;i<twoLayerArr.length;i++)
    {
        let cellVal = twoLayerArr[i].getCellVal();
        arr.push(cellVal);
    }
    return arr; //normalized array of O and X
}

function pickRandomFromArray(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}

window.addEventListener("load",()=>initialize());





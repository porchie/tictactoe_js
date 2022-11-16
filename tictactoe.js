import {TicTacToeCell} from "./tictactoecell.js";

const tictactoeArray = [
    [new TicTacToeCell,new TicTacToeCell,new TicTacToeCell],
    [new TicTacToeCell,new TicTacToeCell,new TicTacToeCell],
    [new TicTacToeCell,new TicTacToeCell,new TicTacToeCell]
];
const lastCap = -1;
function initialize()
{

}

function captureTile(row, col, tileIn)
{   
    if ((lastCap != -1 && (row*3) + col != lastCap) && 
    tictactoeArray[row][col].capture(tileIn))
    {
        lastCap = (row*3)+col;
    }
}




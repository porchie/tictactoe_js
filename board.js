export class TicTacToeCell
{
    constructor()
    {
        this.tictactoe = "";
        this.capturedNum = 0;
    }

    capture(tictacInput)
    {
        this.tictactoe += tictacInput;
        this.capturedNum++;
    }

    
}
export class TicTacToeCell
{
    constructor()
    {
        this.cellVal = "";
        this.capturedNum = 0;
    }

    capture(tictacInput)
    {
        if(this.capturedNum < 2)
        {
            console.log("yes");
            this.cellVal = tictacInput;
            this.capturedNum++;   
            return true;
        }
        return false;
    }

    getCapturedNum()
    {
        return this.capturedNum;
    }

    getCellVal()
    {
        return this.cellVal;
    }

    reset()
    {
        this.cellVal = "";
        this.capturedNum = 0;
    }
}
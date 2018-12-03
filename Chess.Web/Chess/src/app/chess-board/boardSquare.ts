export class BoardSquare{
    private file: string = "";
    private rank: number = 0;

    public setFile(file: string): void{
        this.file=file;
    }
    
    public setRank(rank: number): void{
        this.rank=rank;
    }
    
    public getFile(): string{
       return this.file;
    }
    
    public getRank(): number{
        return this.rank;
    }
}
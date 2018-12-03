import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Move } from "./move.service";

@Injectable({providedIn: 'root'})
export class ChessBoardService {
    private fenSubject: Subject<string> = new Subject();

    public draw(fen: string): void {
        this.fenSubject.next(fen);
    }

    public get chessBoardState(): Observable<string> {
        return this.fenSubject.asObservable();
    } 

    public validateMove(move: string)
    {
    return true;        
    }
    public makeMove(move: Move,board: any)
    {
        //VALIDATE MOVE = CHECK IF THERE ARE'T OTHER PIECES BETWEEN POSITIONS OR THE DESTINATION IS'T OCUPPIED BY THE SAME PLAYER
        if(move.getElimination())
        {
            let boardAfterElim = board.position();
            boardAfterElim[move.getDestinationString()]=boardAfterElim[move.getOriginString()];
            delete boardAfterElim[move.getOriginString()];
            board.position(boardAfterElim,false);
            console.log(move.getOriginString(),move.getDestinationString())
        }
        else{
        board.move(move.getOriginString()+'-'+move.getDestinationString());
        }    
    }
    public pgnTypeMove(move: string, board: any) : any
    {
        let moveArray=move.split(" ");
        let player='w';
        for (let item of moveArray.slice(1) ){
             if(item!=="") {
             let m = new Move(item);
             m.calculateOrigin(board,player);
             this.makeMove(m,board);
             player='b';
             }       
            }
    }
}
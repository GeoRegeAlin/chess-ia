import {
  Injectable
} from "@angular/core";
import {
  Subject,
  Observable
} from "rxjs";
import {
  Move
} from "./move.service";

@Injectable({
  providedIn: 'root'
})
export class ChessBoardService {
  private fenSubject: Subject < string > = new Subject();

  public draw(fen: string): void {
    this.fenSubject.next(fen);
  }

  public get chessBoardState(): Observable < string > {
    return this.fenSubject.asObservable();
  }

  public validateMove(move: Move, board: any) {
    if (!move.getElimination()) {
      if (move.getPiece() === 'P') {
        if (move.getDirection()[0] !== 0) {
          return false;
        }
      }
      if (board.position().hasOwnProperty(move.getDestinationString())) {
        return false;
      }
    } else {
      if (board.position().hasOwnProperty(move.getDestinationString())) {
        if (board.position()[move.getDestinationString()]) {
          if (board.position()[move.getDestinationString()][0] === move.getPlayer()) {
            return false;
          }
        }
      }
    }
    if (move.getPiece() === 'K') {
      return true;
    }
    if (['R', 'Q', 'B'].includes(move.getPiece())) {
      let f = Number(move.getOrigin().getFile().charCodeAt(0));
      let r = Number(move.getOrigin().getRank());
      let f1 = Number(move.getDestination().getFile().charCodeAt(0));
      let r1 = Number(move.getDestination().getRank());
      let d = move.getDirection();
      f += d[0];
      r += d[1];
      while (r1 !== r || f1 !== f) {
        if (board.position().hasOwnProperty(String.fromCharCode(f) + String(r))) {
          return false;
        }
        f += d[0];
        r += d[1];
      }
    }
    return true;
  }
  public makeMove(move: Move, board: any) {
    //TO DO
    
    //LOGIC FOR CHECKING AND CHECKMATE MOVE
     //LOGIC FOR SWAPING PEON FOR SOMETING ELSE IF IT IS AT THE END OF THE TABLE
     //LOGIC FOR CASTLING ? ROCADA
    
    
     if (!this.validateMove(move, board)) return false;
    if (move.getElimination()) {
      let boardAfterElim = board.position();
      boardAfterElim[move.getDestinationString()] = boardAfterElim[move.getOriginString()];
      delete boardAfterElim[move.getOriginString()];
      board.position(boardAfterElim, false);
    } else {
      board.move(move.getOriginString() + '-' + move.getDestinationString());
    }
    return true;
  }
  public pgnTypeMove(move: string, board: any): any {
    let moveArray = move.split(" ");
    let player = 'w';
    for (let item of moveArray.slice(1)) {
      if (item !== "") {
        let m = new Move(item);
        m.calculateOrigin(board, player);
        this.makeMove(m, board);
        player = 'b';
      }
    }
  }
}

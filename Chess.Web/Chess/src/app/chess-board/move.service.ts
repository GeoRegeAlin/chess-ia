const piecesMove = {
  wK: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ],
  wN: [
    [-1, -2],
    [-1, 2],
    [-2, -1],
    [-2, 1],
    [1, 2],
    [1, -2],
    [2, -1],
    [2, 1]
  ],
  bK: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ],
  bN: [
    [-1, -2],
    [-1, 2],
    [-2, -1],
    [-2, 1],
    [1, 2],
    [1, -2],
    [2, -1],
    [2, 1]
  ],
  wP: [
    [0, -1],
    [0, -2],
    [-1, 1],
    [-1, -1]
  ],
  bP: [
    [0, 1],
    [0, 2],
    [1, 1],
    [1, -1]
  ]
};
import {
  BoardSquare
} from './boardSquare';
export class Move {
  private piece: string;
  private origin: BoardSquare;
  private destination: BoardSquare;
  private elimination: Boolean = false;
  constructor(move: string) {
    if (move[0] === move[0].toUpperCase()) {
      this.piece = move[0];
      move = move.slice(1);
    } else
      this.piece = 'P';
    if(move[move.length-1]==='+') 
    {
        this.elimination = true;
        move=move.replace('+','');
    }
    this.origin = new BoardSquare();
    this.destination = new BoardSquare();
    this.destination.setFile(move[move.length - 2]);
    this.destination.setRank(Number(move[move.length - 1]));
    /*
    IMPLEMENT RECIEVING DESTINATION
    */
  }
  public getElimination(): Boolean {
    return this.elimination;
  }
  public getOriginString(): string {
    return String(this.origin.getFile() + this.origin.getRank());
  }
  public getDestinationString(): string {
    return String(this.destination.getFile() + this.destination.getRank());
  }
  public calculateOrigin(board: any, player: string) {
    let position = board.position()
    let currentPiece = player + this.piece;
    // FIX ATTACK ON DIAGONAL FOR PEON

    if (["wP", "bP", "wN", "bN", "wK", "bK"].includes(currentPiece)) {
      for (let item of piecesMove[currentPiece]) {
        let f = this.destination.getFile().charCodeAt(0) + item[0];
        let r = this.destination.getRank() + item[1];
        let result = String.fromCharCode(f) + String(r);;
        if (position.hasOwnProperty(result)) {
          if (position[result] == currentPiece) {
            this.origin.setFile(String.fromCharCode(f));
            this.origin.setRank(r);
          }
        }
      }
    }
    if(["wQ","bQ","wR","bR","wB","bB"].includes(currentPiece)){}
    // IMPLEMENT CASE FOR MULTIPLE QUEENS 
    if(["wQ","bQ"].includes(currentPiece)) {
      for(let item in position){
          if(currentPiece===position[item]){
            let f = Number(this.destination.getFile().charCodeAt(0));
            let r = Number(this.destination.getRank());
            let f1 = Number(item[0].charCodeAt(0));
            let r1 = Number(item[1]);

            if(Math.abs(f1-f) === Math.abs(r1-r))
            {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1);  
              break;
            }
            if(Math.abs(f1-f) ===0  || Math.abs(r1-r) ===0)
            {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1); 
              break;
            }
          }
      }
    }
    //AGAIN YOU MUST IMPLEMENT THE PART OF THE CONSTRUCTOR FOR RECIVING ORIGIN AS WELL
    //ONLY FOR MULTIPLE ROOKS WITH THE SAME COLOR, UNTIL HAVING 2 ROOKS WITH THE SAME LINE COLOR
    if(["wB","bB"].includes(currentPiece)) {
      for(let item in position){
          if(currentPiece===position[item]){
            let f = Number(this.destination.getFile().charCodeAt(0));
            let r = Number(this.destination.getRank());
            let f1 = Number(item[0].charCodeAt(0));
            let r1 = Number(item[1]);

            if(Math.abs(f1-f) === Math.abs(r1-r))
            {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1);  
              break;
            }
          }
      }
    }
    //AGAIN YOU MUST IMPLEMENT THE PART OF THE CONSTRUCTOR FOR RECIVING ORIGIN AS WELL
    //THE ROOKS CAND BE ON THE SAME COLOR SQUARES
    if(["wR","bR"].includes(currentPiece)) {
      for(let item in position){
          if(currentPiece===position[item]){
            let f = Number(this.destination.getFile().charCodeAt(0));
            let r = Number(this.destination.getRank());
            let f1 = Number(item[0].charCodeAt(0));
            let r1 = Number(item[1]);

            if(Math.abs(f1-f) ===0  || Math.abs(r1-r) ===0)
            {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1); 
              break;
            }
          }
      }
    }
  
  
  }
}

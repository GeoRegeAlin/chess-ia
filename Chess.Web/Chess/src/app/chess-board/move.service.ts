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
    [0, -2]
  ],
  bP: [
    [0, 1],
    [0, 2]
  ]
};
import {
  BoardSquare
} from './boardSquare';
import {
  post
} from 'selenium-webdriver/http';
import {
  TouchSequence
} from 'selenium-webdriver';
export class Move {
  private piece: string;
  private origin: BoardSquare;
  private destination: BoardSquare;
  constructor(move: string) {
    if (move[0] === move[0].toUpperCase()) {
      this.piece = move[0];
      move = move.slice(1);
    } else
      this.piece = 'P';
    this.origin = new BoardSquare();
    this.destination = new BoardSquare();
    this.destination.setFile(move[move.length - 2]);
    this.destination.setRank(Number(move[move.length - 1]));
    /*
    IMPLEMENT RECIEVING DESTINATION
    */
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
    if (["wP","bP","wN","bN","wK","bK"].includes(currentPiece)) {
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
  }
}

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
  private direction = [];
  private player;
  private stage: number;
  constructor(move: string) {

    if (move.includes('+')) {
      this.stage = 1;
      move = move.replace('+', '');
    } else if (move.includes('#')) {
      this.stage = 2;
      move = move.replace('#', '');
    } else {
      this.stage = 3;
    }
    if (move[0] === move[0].toUpperCase() && '12345678'.includes(move[0]) === false) {
      this.piece = move[0];
      move = move.slice(1);
    } else
      this.piece = 'P';
    if (move.includes('x')) {
      this.elimination = true;
      move = move.replace('x', '');
    }

    this.origin = new BoardSquare();
    this.destination = new BoardSquare();
    this.destination.setFile(move[move.length - 2]);
    this.destination.setRank(Number(move[move.length - 1]));

    if (move.length === 3) {
      if ('abcdefgh'.includes(move[0])) this.origin.setFile(move[0])
      if ('12345678'.includes(move[0])) this.origin.setRank(Number(move[0]));
    }
    if (move.length === 4) {
      this.origin.setFile(move[0])
      this.origin.setRank(Number(move[1]));
    }
  }

  public getPiece(): string {
    return this.piece;
  }
  public getElimination(): Boolean {
    return this.elimination;
  }
  public getPlayer() {
    return this.player;
  }
  public getDestination(): BoardSquare {
    return this.destination;
  }
  public getOrigin(): BoardSquare {
    return this.origin;
  }
  public getDirection() {
    return this.direction;
  }
  public getOriginString(): string {
    return String(this.origin.getFile() + this.origin.getRank());
  }
  public getDestinationString(): string {
    return String(this.destination.getFile() + this.destination.getRank());
  }
  public calculateOrigin(board: any, player: string) {
    this.player = player;
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

            if (this.origin.getFile() === "" && this.origin.getRank() === 0) {

              this.origin.setFile(String.fromCharCode(f));
              this.origin.setRank(r);
              this.direction.push(-1 * item[0]);
              this.direction.push(-1 * item[1]);
              break;
            } else {
              if (this.origin.getFile() === result[0]) {
                this.direction.push(-1 * item[0]);
                this.direction.push(-1 * item[1]);
                this.origin.setRank(r);
                break;
              }
              if (this.origin.getRank() === Number(result[1])) {
                this.direction.push(-1 * item[0]);
                this.direction.push(-1 * item[1]);
                this.origin.setFile(String.fromCharCode(f));
                break;
              }
            }

          }
        }
      }
    }
    if (["wQ", "bQ", "wR", "bR", "wB", "bB"].includes(currentPiece)) {}
    // IMPLEMENT CASE FOR MULTIPLE QUEENS 
    if (["wQ", "bQ"].includes(currentPiece)) {
      for (let item in position) {
        if (currentPiece === position[item]) {
          let f = Number(this.destination.getFile().charCodeAt(0));
          let r = Number(this.destination.getRank());
          let f1 = Number(item[0].charCodeAt(0));
          let r1 = Number(item[1]);
          let rightChoice = true;
          if (this.origin.getFile() !== "") {
            if (this.origin.getFile() !== item[0]) rightChoice = false;
          }
          if (this.origin.getRank() !== 0) {
            if (this.origin.getRank() !== Number(item[1])) rightChoice = false;
          }
          if (rightChoice)
            if (Math.abs(f1 - f) === Math.abs(r1 - r) || Math.abs(f1 - f) == 0 || Math.abs(r1 - r) == 0) {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1);
              if (Math.abs(f1 - f) === Math.abs(r1 - r)) {
                if (f > f1) {
                  this.direction.push(1);
                  if (r > r1) {
                    this.direction.push(1);
                  } else {
                    this.direction.push(-1);
                  }
                } else {
                  this.direction.push(-1);
                  if (r > r1) {
                    this.direction.push(1);
                  } else {
                    this.direction.push(-1);
                  }
                }
                break;
              } else {
                if (Math.abs(f1 - f) === 0) {
                  if (r1 > r) {
                    this.direction.push(0);
                    this.direction.push(-1);
                  } else {
                    this.direction.push(0);
                    this.direction.push(1);
                  }
                  break;
                } else(Math.abs(r1 - r) === 0) 
                {
                  if (f1 > f) {
                    this.direction.push(-1);
                    this.direction.push(0);
                  } else {
                    this.direction.push(1);
                    this.direction.push(0);
                  }
                  break;
                }
              }
            }
        }
      }
    }
    //AGAIN YOU MUST IMPLEMENT THE PART OF THE CONSTRUCTOR FOR RECIVING ORIGIN AS WELL
    //ONLY FOR MULTIPLE ROOKS WITH THE SAME COLOR, UNTIL HAVING 2 ROOKS WITH THE SAME LINE COLOR
    if (["wB", "bB"].includes(currentPiece)) {
      for (let item in position) {
        if (currentPiece === position[item]) {
          let f = Number(this.destination.getFile().charCodeAt(0));
          let r = Number(this.destination.getRank());
          let f1 = Number(item[0].charCodeAt(0));
          let r1 = Number(item[1]);
          let rightChoice = true;
          if (this.origin.getFile() !== "") {
            if (this.origin.getFile() !== item[0]) rightChoice = false;
          }
          if (this.origin.getRank() !== 0) {
            if (this.origin.getRank() !== Number(item[1])) rightChoice = false;
          }
          if (rightChoice)
            if (Math.abs(f1 - f) === Math.abs(r1 - r)) {
              this.origin.setFile(String.fromCharCode(f1));
              this.origin.setRank(r1);
              if (f > f1) {
                this.direction.push(1);
                if (r > r1) {
                  this.direction.push(1);
                } else {
                  this.direction.push(-1);
                }
              } else {
                this.direction.push(-1);
                if (r > r1) {
                  this.direction.push(1);
                } else {
                  this.direction.push(-1);
                }
              }
              break;
            }
        }
      }
    }
    //AGAIN YOU MUST IMPLEMENT THE PART OF THE CONSTRUCTOR FOR RECIVING ORIGIN AS WELL
    //THE ROOKS CAND BE ON THE SAME COLOR SQUARES
    if (["wR", "bR"].includes(currentPiece)) {
      for (let item in position) {
        if (currentPiece === position[item]) {
          let f = Number(this.destination.getFile().charCodeAt(0));
          let r = Number(this.destination.getRank());
          let f1 = Number(item[0].charCodeAt(0));
          let r1 = Number(item[1]);
          let rightChoice = true;
          let s=this.origin.getFile();
          if (this.origin.getFile() !== "") {
            if (s.localeCompare(item[0])!==0) rightChoice = false;
          }
          if (this.origin.getRank() !== 0) {
            if (this.origin.getRank() !== Number(item[1])) rightChoice = false;
          }
          
          
          
          if (rightChoice) {
          this.origin.setFile(String.fromCharCode(f1));
          this.origin.setRank(r1);
            if (Math.abs(f1 - f) === 0) {
              if (r1 > r) {
                this.direction.push(0);
                this.direction.push(-1);
              } else {
                this.direction.push(0);
                this.direction.push(1);
              }
              break;
            }
            if (Math.abs(r1 - r) === 0) {
              if (f1 > f) {
                this.direction.push(-1);
                this.direction.push(0);
              } else {
                this.direction.push(1);
                this.direction.push(0);
              }
              break;
            }
          }
        }
      }
    }
  }
}

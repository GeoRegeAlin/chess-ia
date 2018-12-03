import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ChessBoardService
} from './chess-board.service';
import {
  ChessService
} from '../service/chess.service';

declare var ChessBoard: any;

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {
  public movementData: string = "";
  private board: any;
  private currentItem: {
    square,
    piece
  };

  constructor(private chessBoardService: ChessBoardService, private chessService: ChessService) {}

  public  ngOnInit():any {
    let cfg = {
      draggable: false,
      position: 'start',
      onMouseoverSquare: (square, piece) => {
        this.currentItem = {
          square: square,
          piece: piece
        };
      },
    };
    this.board = ChessBoard('board', cfg);
     this.chessBoardService.chessBoardState.subscribe(async(exp) =>  {

      var fenExtendedType = /([prnbqkPRNBQK12345678]*\/){7}([prnbqkPRNBQK12345678]*) ?((w|b) ((K?Q?k?q?)|\-) (([abcdefgh][36])|\-) (\d*) (\d*))?/;
      var isFen = fenExtendedType.test(exp);
      if (isFen === true) {
        this.board.position(exp);
        this.chessService.move({
          gameBoardAsFen: this.board.fen()
        }).subscribe((data) => {
          this.movementData = data.result;
        });
      } else {
        var pgnType = /((\d*.) (([KQRBNP]?[a-h]?[1-8]?[x]?[a-h][1-8])|(O-O)|(O-O-O))[+#]? (([KQRBNP]?[a-h]?[1-8]?[x]?[a-h][1-8])|(O-O)|(O-O-O))[+#]?)/g;
        var found = exp.match(pgnType);
        for (let item of found) {
             await this.chessBoardService.pgnTypeMove(item, this.board);
        }
      }

    });
  }
}

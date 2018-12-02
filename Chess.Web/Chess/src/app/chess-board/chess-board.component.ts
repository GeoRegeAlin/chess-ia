import { Component, OnInit, Input } from '@angular/core';
import { ChessBoardService } from './chess-board.service';
import { ChessService } from '../service/chess.service';

declare var ChessBoard: any;

@Component({
    selector: 'app-chess-board',
    templateUrl: './chess-board.component.html',
    styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {
    public movementData: string = "";
    
    private board: any;
    private currentItem: { square, piece };

    constructor(private chessBoardService: ChessBoardService, private chessService: ChessService) {
    }

    public ngOnInit(): void {
        let cfg = {
            draggable: false,
            position: 'start',
            onMouseoverSquare: (square, piece) => {
                this.currentItem = { square: square, piece: piece };
            },
        };
        this.board = ChessBoard('board', cfg);
        this.board.move ("e2-e4");
        this.chessBoardService.chessBoardState.subscribe((fen) => {
            this.board.position(fen);
            this.chessService.move({
                gameBoardAsFen: this.board.fen()
            }).subscribe((data) => {
                this.movementData = data.result;
            });
        });
    }
}

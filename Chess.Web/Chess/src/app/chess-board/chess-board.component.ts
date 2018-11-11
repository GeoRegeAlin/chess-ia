import { Component, OnInit } from '@angular/core';
declare var ChessBoard: any;

@Component({
    selector: 'app-chess-board',
    templateUrl: './chess-board.component.html',
    styleUrls: ['./chess-board.component.scss']
})
export class ChessBoardComponent implements OnInit {
    public ngOnInit(): void {
        var board2 = ChessBoard('board', 'start');
    }
}

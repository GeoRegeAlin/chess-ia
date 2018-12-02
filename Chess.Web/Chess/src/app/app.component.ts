import { Component } from '@angular/core';
import * as $ from 'jquery';
import { ChessBoardService } from './chess-board/chess-board.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public fen: string = "";

    constructor(private chessBoardService: ChessBoardService) {
        window['jQuery'] = $;
    }

    public drawChessBoard(): void {
        this.chessBoardService.draw(this.fen);
    }
}

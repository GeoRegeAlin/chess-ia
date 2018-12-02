import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ChessBoardService {

    private fenSubject: Subject<string> = new Subject();

    public draw(fen: string): void {
        this.fenSubject.next(fen);
    }

    public get chessBoardState(): Observable<string> {
        return this.fenSubject.asObservable();
    } 
}
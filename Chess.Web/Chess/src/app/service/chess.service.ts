import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovementState } from "./movement-state";
import { Observable } from "rxjs";
import { MovementResult } from "./movement-result";

@Injectable({
    providedIn: "root"
})
export class ChessService {
    private apiDomain: string = "http://localhost:5001"

    constructor(private client: HttpClient) {
    }

    public move(movementState: MovementState): Observable<MovementResult> {
        return this.client.post<MovementResult>(`${this.apiDomain}/api/chess/move`, movementState);
    }
}
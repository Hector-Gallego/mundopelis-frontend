import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Actor } from '../model/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorsUrl = 'http://localhost:8080/api/actors' 

  constructor(private messageService: MessageService, private http: HttpClient) { }

  /** GET heroes from the server */
  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.actorsUrl).pipe(
      catchError(this.handleError<Actor[]>('getActors', []))
    )
  }

  getActor(id: number): Observable<Actor> {

    const url = `${this.actorsUrl}/${id}`;
    
    return this.http.get<Actor>(url).pipe(
      tap(_ => this.log(`fetched Actor id=${id}`)),
      catchError(this.handleError<Actor>(`getActor id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    };
  }

  private log(message: string) {
    this.messageService.add(`ActorService: ${message}`);
  }
}

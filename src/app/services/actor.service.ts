import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Actor } from '../model/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorsUrl = 'http://localhost:8080/api/actors' 

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.actorsUrl).pipe(
      catchError(this.handleError<Actor[]>('getActors', []))
    )
  }

  getActor(id: number): Observable<Actor> {
    const url = `${this.actorsUrl}/${id}`;
    return this.http.get<Actor>(url).pipe(
      catchError(this.handleError<Actor>(`getActor id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Director } from '../model/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private directorsUrl = 'http://localhost:8080/api/directors'

  /** GET heroes from the server */
  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.directorsUrl).pipe(
      catchError(this.handleError<Director[]>('getDirectors', []))
    )
  }

  getDirector(id: number): Observable<Director> {

    const url = `${this.directorsUrl}/${id}`;
    
    return this.http.get<Director>(url).pipe(
      tap(_ => this.log(`fetched Director id=${id}`)),
      catchError(this.handleError<Director>(`getDirector id=${id}`))
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
    this.messageService.add(`DirectorService: ${message}`);
  }
}

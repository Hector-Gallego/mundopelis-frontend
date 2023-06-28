import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl = 'http://localhost:8080/api/genres';


  constructor(private messageService: MessageService, private http: HttpClient) { }

  /** GET heroes from the server */
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl).pipe(
      catchError(this.handleError<Genre[]>('getGenres', []))
    )
  }

  getGenre(id: number): Observable<Genre> {

    const url = `${this.genresUrl}/${id}`;
    
    return this.http.get<Genre>(url).pipe(
      tap(_ => this.log(`fetched genre id=${id}`)),
      catchError(this.handleError<Genre>(`getgenre id=${id}`))
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
    this.messageService.add(`GenreService: ${message}`);
  }



}

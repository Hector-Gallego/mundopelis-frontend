import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genresUrl = 'http://localhost:8080/api/genres';


  constructor(private http: HttpClient) { }


  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl).pipe(
      catchError(this.handleError<Genre[]>('getGenres', []))
    )
  }

  getGenre(id: number): Observable<Genre> {
    const url = `${this.genresUrl}/${id}`;
    return this.http.get<Genre>(url).pipe(
      catchError(this.handleError<Genre>(`getgenre id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);

    };
  }

}

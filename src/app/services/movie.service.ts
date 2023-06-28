import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) { }



  /** GET Moviees from the server */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      catchError(this.handleError<Movie[]>('getMovies', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


  getMovie(id: number): Observable<Movie> {

    const url = `${this.moviesUrl}/${id}`;

    return this.http.get<Movie>(url).pipe(

      catchError(this.handleError<Movie>(`getmovie id=${id}`))
    );
  }

  addMovie(Movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, Movie, this.httpOptions).pipe(
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  deleteMovie(id: Number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      catchError(this.handleError<Movie>('deleteHero'))
    );
  }

  updateMovie(movie: Movie, id: Number): Observable<any> {

    const url = `${this.moviesUrl}/${id}`;
    return this.http.put(url, movie, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/term/${term}`).pipe(
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

}



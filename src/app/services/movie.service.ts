import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
//import { MOVIES } from './mock-movies';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'http://localhost:8080/api/movies';  // URL to web api

  constructor(private messageService: MessageService, private http: HttpClient) { }

  /** 
    getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    this.messageService.add('MovieService: fetched Moviees');
    return movies;
  }
  */


  /** GET Moviees from the server */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      catchError(this.handleError<Movie[]>('getMovies', []))
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    };
  }


  getMovie(id: number): Observable<Movie> {

    const url = `${this.moviesUrl}/${id}`;

    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched Movie id=${id}`)),
      catchError(this.handleError<Movie>(`getmovie id=${id}`))
    );
  }

  addMovie(Movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, Movie, this.httpOptions).pipe(
      tap((newMovie: Movie) => this.log(`added Movie w/ id=${newMovie.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  deleteMovie(id: Number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
  
    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Movie>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
updateMovie(movie: Movie, id: Number): Observable<any> {

  const url = `${this.moviesUrl}/${id}`;
  return this.http.put(url , movie, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${movie.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/term/${term}`).pipe(
      tap(x => x.length ?
         this.log(`found movies matching "${term}"`) :
         this.log(`no movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }







}



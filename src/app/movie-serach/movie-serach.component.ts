import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-serach',
  templateUrl: './movie-serach.component.html',
  styleUrls: ['./movie-serach.component.css']
})
export class MovieSerachComponent {

  movies$!: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
  }

}

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

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
  }

}

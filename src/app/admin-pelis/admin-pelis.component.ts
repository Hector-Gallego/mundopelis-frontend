import { Component } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-admin-pelis',
  templateUrl: './admin-pelis.component.html',
  styleUrls: ['./admin-pelis.component.css']
})
export class AdminPelisComponent {

  constructor(private movieService: MovieService) { }

  movies: Movie[] = [];

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies.sort((a, b) => Number(a.id) - Number(b.id));
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

 

  deleteMovie(movie: Movie): void {
    
      this.movies = this.movies.filter(m => m !== movie);
      this.movieService.deleteMovie(movie.id).subscribe(); 
  }

}

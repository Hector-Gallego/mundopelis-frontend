import { Component } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';
import { MessageService } from '../services/message.service';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private movieService:MovieService, private messageService: MessageService){}

  movies : Movie[] = [];

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies.sort((a, b) => Number(a.id) - Number(b.id));
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

}

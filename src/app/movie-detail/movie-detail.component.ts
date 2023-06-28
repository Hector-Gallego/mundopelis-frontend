import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service'; 
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  movie : Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}
  
  
  ngOnInit(): void {
   this.getMovie();
  }
  
  
  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }
  

  goBack(): void {
    this.location.back();
  }

 

  /*
  @Input() movie?: Movie;
  */
  

}

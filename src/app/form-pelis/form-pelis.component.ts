import { Component } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { ActorService } from '../services/actor.service';
import { DirectorService } from '../services/director.service';
import { MovieService } from '../services/movie.service';
import { Genre } from '../model/genre';
import { Actor } from '../model/actor';
import { Director } from '../model/director';
import { Movie } from '../model/movie';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-pelis',
  templateUrl: './form-pelis.component.html',
  styleUrls: ['./form-pelis.component.css']
})
export class FormPelisComponent {

  genres: Genre[] = [];
  actors: Actor[] = [];
  directors: Director[] = [];

  movie: Movie = {} as Movie;
  
  url: string = "https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png";

  selectedGenres: Genre[] = [];
  selectedActors: Actor[] = [];

  movieId: number | undefined;

  constructor(private genresService: GenreService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.movieId = this.route.snapshot.params['id'];

    if (this.movieId) {

      this.movieService.getMovie(this.movieId).subscribe(movie => {
        this.movie = movie;
        this.selectedActors.push(...this.movie.actors);
        this.selectedGenres.push(...this.movie.genres);
        this.url = this.movie.url;

      });

    }

    this.getGenres();
    this.getActors();
    this.getDirectors();
  }


  getGenres(): void {
    this.genresService.getGenres().subscribe(genres => this.genres = genres);
  }

  getActors(): void {
    this.actorService.getActors().subscribe(actors => this.actors = actors);
  }

  getDirectors(): void {
    this.directorService.getDirectors().subscribe(directors => this.directors = directors);
  }


  selectGenre(genre: Genre): void {
    if (this.isSelectedGenre(genre)) {
      this.selectedGenres = this.selectedGenres.filter(selectedGenre => selectedGenre.id !== genre.id);
    } else {
      this.selectedGenres.push(genre);
    }
  }

  selectActor(actor: Actor): void {
    if (this.isSelectedActor(actor)) {
      this.selectedActors = this.selectedActors.filter(selectedActor => selectedActor.id !== actor.id);
    } else {
      this.selectedActors.push(actor);
    }
  }

  isSelectedGenre(genre: Genre): boolean {
    return this.selectedGenres.some(selectedGenre => selectedGenre.id === genre.id);
  }

  isSelectedActor(actor: Actor): boolean {
    return this.selectedActors.some(selectedActor => selectedActor.id === actor.id);
  }

 
  addMovie(): void {

    this.movie.actors = this.selectedActors;
    this.movie.genres = this.selectedGenres;
    this.movie.url = this.url;

    if (this.movieId) {

      this.movieService.updateMovie(this.movie, this.movieId)
        .subscribe(_ => {
          this.router.navigate(['/movies']);
        });
       
    } else {
      this.movieService.addMovie(this.movie)
        .subscribe(_ => { 
          this.router.navigate(['/movies']);
        });
    }
  }
}

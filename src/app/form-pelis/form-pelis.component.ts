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
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, tap } from 'rxjs';
import { delay } from 'rxjs';




@Component({
  selector: 'app-form-pelis',
  templateUrl: './form-pelis.component.html',
  styleUrls: ['./form-pelis.component.css']
})
export class FormPelisComponent {

  //formulario reactivo

  submited = false;

  genres: Genre[] = [];
  actors: Actor[] = [];
  directors: Director[] = [];
  msgToast: string = "";

  movie: Movie = {} as Movie;

  url: string = "";

  selectedGenres: Genre[] = [];
  selectedActors: Actor[] = [];
  selectedDirector = {} as Director;

  movieId: number | undefined;

  registerForm = {} as FormGroup;

  constructor(private genresService: GenreService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        url: [this.url, Validators.required],
        description: ["", [Validators.required, Validators.minLength(50)]],
        genres: ['', Validators.required],
        actors: ['', Validators.required],
        director: ['', Validators.required]
      }
    );

    this.movieId = this.route.snapshot.params['id'];
    

    if (this.movieId) {

      this.movieService.getMovie(this.movieId).subscribe(movie => {
        this.movie = movie;
        this.selectedActors.push(...this.movie.actors);
        this.selectedGenres.push(...this.movie.genres);
        this.url = this.movie.url;

        this.registerForm.controls['name'].setValue(this.movie.name);
        this.registerForm.controls['url'].setValue(this.movie.url);
        this.registerForm.controls['description'].setValue(this.movie.description);
        this.registerForm.controls['genres'].setValue(this.movie.genres);
        this.registerForm.controls['actors'].setValue(this.movie.actors);
        this.registerForm.controls['director'].setValue(this.movie.director);
        this.registerForm.controls['actors'].setValue(this.movie.actors);
        this.registerForm.controls['genres'].setValue(this.movie.genres);

      });

    }

    this.loadData();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  loadData(): void {
    forkJoin([
      this.genresService.getGenres(),
      this.actorService.getActors(),
      this.directorService.getDirectors()
    ]).subscribe(([genres, actors, directors]) => {
      this.genres = genres;
      this.actors = actors;
      this.directors = directors;
    });
  }

  changeSelect(param: string) {

    if (param === 'actors') {
      const actorsId = this.registerForm.controls['actors'].value;
      this.selectedActors = this.actors.filter(actor => actorsId.includes(actor.id));

    } else if (param === "director") {
      const directorId = this.registerForm.controls['director'].value;

      const findDirector = this.directors.find(director => director.id === directorId);

      if (findDirector) {
        this.movie.director = findDirector;
        console.log(this.movie.director);
      }

    } else if (param === 'genres') {
      const genresId = this.registerForm.controls['genres'].value;
      this.selectedGenres = this.genres.filter(genre => genresId.includes(genre.id));
    }
  }

  onReset() {
    this.submited = false;
    this.selectedGenres = [];
    this.selectedActors = [];
    this.movie.director = {} as Director;
    console.log(this.movie.director);
    
    this.registerForm?.reset();
  }

  addMovie(): void {

    this.movie.actors = this.selectedActors;
    this.movie.genres = this.selectedGenres;
    this.movie.url = this.registerForm.controls['url'].value;
    this.movie.name = this.registerForm.controls['name'].value;
    this.movie.description = this.registerForm.controls['description'].value;

    this.submited = true;


    if (this.registerForm?.invalid) {
      console.log(this.fc['description'].errors);
      
      return;
    }

    if (this.movieId) {

      this.movieService.updateMovie(this.movie, this.movieId)
        .pipe(
          tap(() =>{
            this.showSuccess('Película Editada de Forma Exitosa.');
          }),
          delay(3000)
        )
        .subscribe(_ => {
          this.router.navigate(['/movies']);
        });

    } else {
      this.movieService.addMovie(this.movie)
        .subscribe(_ => {
          this.msgToast = 'Película Agregada de Forma Exitosa.';
          console.log(this.movie);
          
          this.showSuccess(this.msgToast);
          this.onReset();
        });
    }
  }

  isEmpty() {
    const objeto = this.movie?.director;
    const isEmpty = objeto !== undefined && objeto !== null && Object.keys(objeto).length === 0;
    return isEmpty;
  }

  showSuccess(msgToast: string) {
    this.toastService.show(msgToast, { classname: 'bg-success text-light', delay: 3000 });
  }
  get fc(){
    return this.registerForm.controls;
  }


}

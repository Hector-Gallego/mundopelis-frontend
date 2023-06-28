import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AdminPelisComponent } from './admin-pelis/admin-pelis.component';
import { FormPelisComponent } from './form-pelis/form-pelis.component';

import { MovieDetailComponent } from './movie-detail/movie-detail.component'; 

const routes: Routes = [
  {path: 'movies', component: MoviesComponent},
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'admin/pelis', component: AdminPelisComponent },
  { path: 'form/pelis', component: FormPelisComponent },
  { path: 'form/pelis/edit/:id', component: FormPelisComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

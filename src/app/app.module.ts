import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TruncatePipe } from './truncate.pipe';
import { AdminPelisComponent } from './admin-pelis/admin-pelis.component';
import { FormPelisComponent } from './form-pelis/form-pelis.component';
import { MovieSerachComponent } from './movie-serach/movie-serach.component';



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    HeaderComponent,
    TruncatePipe,
    AdminPelisComponent,
    FormPelisComponent,
    MovieSerachComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

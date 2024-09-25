import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AlbumComponent } from './components/album/album.component';
import { MusicComponent } from './components/music/music.component';
// Services
import { SpotifyService } from './services/spotify.service';

// Importar Rutas
import { ROUTES, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// Pipes 
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    TarjetasComponent,
    ArtistaComponent,
    LoadingComponent,
    NoimagePipe,
    DomseguroPipe,
    AlbumComponent,
    MusicComponent,
  ], 
  imports: [
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  providers: [
    provideHttpClient( withFetch()),
    SpotifyService, 
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


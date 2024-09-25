import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    nuevasCanciones: any[] = [];
    loading: boolean;
    error: boolean;
    mensajeError!: string;
    
    constructor( private spotify: SpotifyService) {
      this.loading = true;
      this.error = false;

      this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          console.log(data);
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio ) => {
          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;
        });
    }
  
  }
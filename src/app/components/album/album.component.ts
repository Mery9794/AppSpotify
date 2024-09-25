import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  selectedAlbum: any;
  albumTracks: any[] = [];  // Lista de canciones del álbum seleccionado
  @Input() items: any[] = [];
  artista: any = {};
  albunes: any[] = [];
  loading: boolean;
  error!: boolean;
  mensajeError!: string;

  // Para manejar la reproducción de audio
  currentAudio: HTMLAudioElement | null = null;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true;
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      const artistaId = params['id'];
      this.getArtista(artistaId);
      this.getAlbumsTracks(artistaId);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe(
        artista => {
          this.artista = artista;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.error = true;
          this.mensajeError = error.error.error.message;
        }
      );
  }

  // Método para obtener álbumes
  getAlbumsTracks(id: string) {
    this.spotify.getAlbumsTracks(id)
      .subscribe(
        albumsTracks => {
          this.albunes = albumsTracks;
          this.loading = false;
        },
        errorServicio => {
          this.loading = false;
          this.error = true;
          this.mensajeError = errorServicio.error.error.message;
        }
      );
  }

  toggleSelection(album: any) {
    if (this.selectedAlbum === album) {
      this.selectedAlbum = null;
      this.albumTracks = [];
    } else {
      this.selectedAlbum = album;
      this.getAlbumTracks(album.id); // Obtener las canciones del álbum seleccionado
    }

    const index = this.selectedAlbum.findIndex((selectedAlbum: { id: any; }) => selectedAlbum.id === album.id);

    if (index !== -1) {
      this.selectedAlbum.splice(index, 1);
    } else {
      this.selectedAlbum.push(album);
    }
  }

  // Método para obtener las canciones de un álbum
  getAlbumTracks(albumId: string) {
    this.spotify.getAlbumTracks(albumId).subscribe(
      tracks => {
        this.albumTracks = tracks;
      },
      error => {
        this.error = true;
        this.mensajeError = error.error.error.message;
      }
    );
  }


} 
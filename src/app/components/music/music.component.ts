import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  
@Input() items: any[] = [];
loading: boolean;
error!: boolean;
mensajeError!: string;
selectedSongs: any[] = [];
  selectedSong: any;

constructor(private router: ActivatedRoute, private spotify: SpotifyService, private ROUTER: Router) {
  this.loading = true;

  this.router.params.subscribe(params => {
    const artistaId = params['id'];
    this.getTopTracks(artistaId);
  });
}

getTopTracks(id: string) {
  this.loading = true;
  this.spotify.getTopTracks(id)
    .subscribe(topTracks => {
      console.log(topTracks);
      this.items = topTracks; 
      this.loading = false;
    });
}

duracion(milliseconds: number): string {
  const minutos = Math.floor(milliseconds / 60000);
  const segundos = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutos + ':' + (+segundos < 10 ? '0' : '') + segundos;
}
verCancion(song: any): void {
  this.selectedSong = song;
}

toggleSelection(song: any): void {
  const index = this.selectedSongs.findIndex(selectedSong => selectedSong.id === song.id);

  if (index !== -1) {
    this.selectedSongs.splice(index, 1);
  } else {
    this.selectedSongs.push(song);
  }
}

getArtistsNames(artists: any[]): string {
  return artists.map(artist => artist.name).join(', ');
}
}
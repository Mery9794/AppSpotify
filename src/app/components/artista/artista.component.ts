import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.css'
})
export class ArtistaComponent implements OnInit{
  @Input() items: any[] = [];
  artista: any = {};
  topTracks: any[] = [];
  albunes: any[] = [];
  musicas: any[] = [];
  loading: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService, private location: Location) {
    this.loading = true;

  }
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const artistId = params['id'];
      this.getArtista(artistId);
      this.getTopTracks(artistId);
      this.getAlbums(artistId);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe(artista => {
        console.log(artista);
        this.artista = artista;
        this.loading = false;
      });
  }

 getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe(topTracks => {
        console.log(topTracks);
        this.musicas = topTracks;
      });
  }

 getAlbums(id: string) {
    this.spotify.getAlbumsTracks(id)
      .subscribe(albums => {
        console.log(albums);
        this.albunes = albums;
      });
  }
  goBack(): void {
    this.location.back();
  }
}
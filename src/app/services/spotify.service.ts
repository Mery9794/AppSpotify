import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private token = 'BQAppAgfeHbaFLwnmXJzfAsADMhJKO-yAEH1ri56-PXyOPpCErzJO9PV-6GCle6oomHs_janyiXKzUsx5rJ_HEGGtCoBY1rmobCCuoj4ldBY6WNw142hXz7lVeSWKM-pdzB24pozsdJALHTiS4O8uzLAqLwP6h9xUsvfN8jKQGPaLIJ9p0qmh8BpLlsxQOBVUE1P6GRiwOmq2VvnehQ';
  private discosFicticiosSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  // Actualiza el token manualmente si lo necesitas
  setAccessToken(token: string) {
    this.token = token;
  }

  // Generar las cabeceras de autorización
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }

  // Función genérica para hacer consultas a la API de Spotify
  getQuery(query: string): Observable<any> {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = this.getAuthHeaders();
    return this.http.get(url, { headers });
  }

  // Nuevos lanzamientos
  getNewReleases(): Observable<any[]> {
    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => data.albums.items));
  }

  // Buscar artistas
  getArtistas(termino: string): Observable<any[]> {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }

  // Artista en particular
  getArtista(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  // Top tracks de un artista
  getTopTracks(id: string): Observable<any[]> {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data: any) => data.tracks));
  }

  // Álbum en particular
  getAlbum(id: string): Observable<any> {
    return this.getQuery(`albums/${id}`);
  }

  // Obtener álbumes de un artista
  getAlbumsTracks(id: string): Observable<any[]> {
    return this.getQuery(`artists/${id}/albums?country=us`)
      .pipe(map((data: any) => {
        const albums = data.items.sort((a: any, b: any) => b.popularity - a.popularity);
        return albums.slice(0, 10);  // Tomar los primeros 10 álbumes
      }));
  }

  // Las canciones de un álbum
  getAlbumTracks(id: string): Observable<any[]> {
    return this.getQuery(`albums/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Obtener todos los discos (esto parece una función en desuso)
  getDiscos(): Observable<any[]> {
    return combineLatest([this.getDiscosReales()])
      .pipe(map(([discosReales]) => [...discosReales]));
  }

  // Discos reales (esto no funcionaría bien con la API actual de Spotify)
  getDiscosReales(): Observable<any[]> {
    return this.getQuery('albums');
  }

}
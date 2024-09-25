import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  artistas: any[] = [];
  loading: boolean = false;

  searchForm: FormGroup;

  constructor(private spotify: SpotifyService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void { }

  buscar(): void {
    const searchTermControl = this.searchForm.get('searchTerm');
  
    if (searchTermControl) {
      const searchTerm = searchTermControl.value;
      if (searchTerm.trim() !== '') {
        console.log(searchTerm);
        this.loading = true;
  
        this.spotify.getArtistas(searchTerm)
          .subscribe((data: any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
          });
      }
    }
  }
}  
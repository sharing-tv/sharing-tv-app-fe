
import { Component, OnInit } from '@angular/core';
import { VodService, VodListItem } from 'src/app/services/vod.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vod',
  templateUrl: './vod.component.html',
  styleUrls: ['./vod.component.scss'],
})
export class VodComponent implements OnInit {
  vodList: VodListItem[] = [];
  isLoading = true;
  error = '';

  constructor(
    private vodService: VodService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadVod();
  }

  loadVod() {
    this.vodService.getVodList().subscribe({
      next: (list) => {
        this.vodList = list;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Errore caricando i video';
        console.error('Errore caricando VOD list:', err);
        this.isLoading = false;
      }
    });
  }

  openDetail(id: string) {
    this.router.navigate(['/vod-detail', id]);
  }

  syncVod() {
    this.isLoading = true;

    this.http.get("/api/admin/vod/sync").subscribe({
      next: () => {
        this.loadVod(); // ricarica la lista aggiornata
      },
      error: (err) => {
        console.error("Errore sync VOD:", err);
        this.isLoading = false;
      }
    });
  }


}


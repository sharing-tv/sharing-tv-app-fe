
import { Component, OnInit } from '@angular/core';
import { VodService, VodListItem } from 'src/app/services/vod.service';
import { Router } from '@angular/router';

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
    private router: Router
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
}


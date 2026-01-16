
// src/app/services/admin-storage-sync.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminStorageService {

  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  syncBunny() {
    return this.http.post(`${this.baseUrl}/admin/storage/sync`, {});
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface GlobalRegion {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalRegionService {

  private apiUrl = 'http://localhost:8080/api/global-regions';

  constructor(private http: HttpClient) {}

  getGlobalRegions(): Observable<GlobalRegion[]> {
    return this.http.get<GlobalRegion[]>(this.apiUrl);
  }
}

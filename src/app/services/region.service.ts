import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Region {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:8080/api/regions';  

  constructor(private http: HttpClient) {}

  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }
}

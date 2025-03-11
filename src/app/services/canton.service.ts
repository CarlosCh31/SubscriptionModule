import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Canton {
  id: number;
  name: string;
  provinceId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CantonService {
  private apiUrl = 'http://localhost:8080/api/cantons';

  constructor(private http: HttpClient) {}

  getAllCantons(): Observable<Canton[]> {
    return this.http.get<Canton[]>(this.apiUrl);  // Returns the list of all cantons
  }

  getCantonsByProvince(provinceId: number): Observable<Canton[]> {
    return this.http.get<Canton[]>(`${this.apiUrl}?provinceId=${provinceId}`);  // Use the proper http client
  }
}

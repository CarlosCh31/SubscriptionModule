import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CyclingService {
  private apiUrl = 'http://localhost:8080/api/cycling';

  constructor(private http: HttpClient) {}

  getLevels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/levels`);
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events`);
  }
}

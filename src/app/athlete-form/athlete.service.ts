import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private apiUrl = 'http://localhost:8080/api/athletes';  // Spring Boot API URL for sports

  constructor(private http: HttpClient) {}

  createAthlete(athleteData: any, options: any = {}): Observable<any> {
    return this.http.post(this.apiUrl, athleteData, {
      ...options,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

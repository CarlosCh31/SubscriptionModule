import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private apiUrl = 'http://localhost:8080/api/volunteers';

  constructor(private http: HttpClient) {}

  createVolunteer(volunteer: any): Observable<any> {
    return this.http.post(this.apiUrl, volunteer);
  }
}

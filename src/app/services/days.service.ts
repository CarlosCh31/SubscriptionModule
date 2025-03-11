import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvailableDay {
  id: number;
  day_name: string;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AvailableDaysService {
  private apiUrl = 'http://localhost:8080/api/available-days';  // URL para el endpoint de AvailableDays

  constructor(private http: HttpClient) {}

  getAllAvailableDays(): Observable<AvailableDay[]> {
    return this.http.get<AvailableDay[]>(this.apiUrl);
  }
}

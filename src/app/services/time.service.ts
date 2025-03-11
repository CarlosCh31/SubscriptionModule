import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Time {
  id: number;
  hour: string;
  minutes: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private apiUrl = 'http://localhost:8080/api/time';  

  constructor(private http: HttpClient) {}

  getAllTimes(): Observable<Time[]> {
    return this.http.get<Time[]>(this.apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SportLevel {
  name: string;
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SportLevelService {
  private apiUrl = 'http://localhost:8080/api/sport-levels'; 

  constructor(private http: HttpClient) { }

  getAllSportLevelsDescriptions(): Observable<SportLevel[]> {
    return this.http.get<SportLevel[]>(`${this.apiUrl}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Laterality {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LateralityService {

  private apiUrl = 'http://localhost:8080/api/laterality';

  constructor(private http: HttpClient) { }

  getLateralityOptions(): Observable<Laterality[]> {
    return this.http.get<Laterality[]>(this.apiUrl);
  }
}

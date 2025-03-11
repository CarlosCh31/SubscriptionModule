import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Province {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private apiUrl = 'http://localhost:8080/api/provinces';  

  constructor(private http: HttpClient) {}

  getAllProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiUrl);  
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DisabilityType {
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DisabilityTypeService {

  private apiUrl = 'http://localhost:8080/api/disability-types';

  constructor(private http: HttpClient) { }

  getDisabilityTypes(): Observable<DisabilityType[]> {
    return this.http.get<DisabilityType[]>(this.apiUrl);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Country {
  id: number;
  name: string;
  regionId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'http://localhost:8080/api/countries';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }
}

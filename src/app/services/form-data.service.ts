import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private apiUrl = 'http://localhost:8080/api/protected/cedula';  // Spring Boot API URL
  private formData: any = {};

  constructor(private http: HttpClient) {}

  setFormData(data: any) {
    this.formData = { ...this.formData, ...data };
  }

  getFormData() {
    return this.formData;
  }

  resetFormData() {
    this.formData = {};
  }

  searchByCedula(cedula: string, tipoCedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cedula}?tipoCedula=${tipoCedula}`);
  }

}

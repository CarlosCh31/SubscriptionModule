import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SportLevel} from "./sport-level.service";


export interface Sport {
  id: number;
  type: string;
  name: string;
  description: string;
  date: string; // LocalDate en formato YYYY-MM-DD
  time: string; // LocalTime en formato HH:MM
  duration: string; // Intervalo en formato HH:MM:SS
  modality: string;
  location: string;
  maxParticipants?: number;
  minimumAge?: number;
  maximumAge?: number;
  administrator: Administrator; // Suponiendo que hay una interfaz para Administrator
  difficulty: string;
  needsSpecialEquipment: boolean;
  specifications?: string;
  level: string;
}

export interface Administrator {
  email: string,
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) {}

  getAllSports(): Observable<Sport[]> { // Debe devolver un array de Sport
    return this.http.get<Sport[]>('http://localhost:8080/api/sports');
  }
}




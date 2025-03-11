import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, NavbarComponent, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'inscriptions-front';
}

export interface Region {
  id: number;
  name: string;
}

export interface Sport {
  sport: any;
  id: number;
  type: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface Canton {
  id: number;
  name: string;
}
export interface SportAdministrator {
  id: number;
  email: string;
  password: string;
}

export interface SportLevel {
  id: number;
  level: string;
  sport: Sport;
}

export interface Sport {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  duration: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  minimumAge: number;
  maximumAge: number;
  modality: string;
  needsSpecialEquipment: boolean;
  specifications: string;
  administrator: SportAdministrator;
  sportLevels: SportLevel[];
}

export interface SportsResponse {
  sports: Sport[];
}

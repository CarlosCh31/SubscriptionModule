import { Component } from '@angular/core';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [],
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent {
  contactos = [
    { region_id: 'Región Central', email: 'hola@olimpiadasespeciales.cr', telefono: '+506 2224 0000', horario: 'Lunes a Viernes, 9:00 AM - 5:00 PM' },
    { region_id: 'Región Chorotega', email: 'hola@olimpiadasespeciales.cr', telefono: '+506 2224 0000', horario: 'Lunes a Viernes, 9:00 AM - 5:00 PM' },
    { region_id: 'Región Brunca', email: 'hola@olimpiadasespeciales.cr', telefono: '+506 2224 0000', horario: 'Lunes a Viernes, 9:00 AM - 5:00 PM' },
    { region_id: 'Región Caribe', email: 'hola@olimpiadasespeciales.cr', telefono: '+506 2224 0000', horario: 'Lunes a Viernes, 9:00 AM - 5:00 PM' }
  ];
}

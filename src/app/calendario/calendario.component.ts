import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    plugins: [dayGridPlugin],
    events: [
      {
        title: 'Fútbol - Eliminatoria',
        date: '2025-04-03',
        encargado: 'Carlos Gómez',
        hora: '9:00 am'
      },
      {
        title: 'Natación - Entrenamiento',
        date: '2025-04-07',
        encargado: 'Laura Méndez',
        hora: '11:00 am'
      }
    ],
    eventDidMount: (info) => {
      // Accedemos a los datos personalizados
      const encargado = (info.event.extendedProps as any).encargado;
      const hora = (info.event.extendedProps as any).hora;
  
      // Creamos el tooltip como atributo "title"
      info.el.setAttribute('title', `${info.event.title}\nEncargado: ${encargado}\nHora: ${hora}`);
    }
  };
  
}

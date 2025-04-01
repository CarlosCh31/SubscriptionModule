import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service'; // Asegurate de ajustar el path

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    plugins: [dayGridPlugin],
    events: [],
    eventDidMount: (info) => {
      const encargado = (info.event.extendedProps as any).encargado;
      const hora = (info.event.extendedProps as any).hora;
      info.el.setAttribute(
        'title',
        `${info.event.title}\nEncargado: ${encargado ?? 'N/A'}\nHora: ${hora ?? 'N/A'}`
      );
    },
  };

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities) => {
      const eventos = activities.map((actividad) => {
        return {
          title: actividad.name,
          start: `${actividad.date}T${actividad.time}`,
          encargado: actividad.adminEmail?.email ?? 'No definido',
          hora: actividad.time
        };
      });

      this.calendarOptions.events = eventos;
    });
  }
}

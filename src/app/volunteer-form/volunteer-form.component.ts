import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { AvailableDaysService, AvailableDay } from '../services/days.service';
import { TimeService, Time } from '../services/time.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { VolunteerService } from "./volunteer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    FormComponent
  ]
})
export class VolunteerFormComponent implements OnInit {
  isVolunteer = true;
  availableDays = [
    { id: 1, day_name: 'Lunes' },
    { id: 2, day_name: 'Martes' },
    { id: 3, day_name: 'Miércoles' },
    { id: 4, day_name: 'Jueves' },
    { id: 5, day_name: 'Viernes' }
  ];

  availableTimes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    hour: (8 + i).toString().padStart(2, '0'),
    minutes: '00'
  }));

  selectedDays: number[] = [];
  selectedTimes: { [dayId: number]: number[] } = {};

  showValidationError = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    public formService: FormService,
    private volunteerService: VolunteerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.formService.getFormData().role !== 'volunteer') {
      this.formService.resetFormData();
      this.formService.setFormData({ role: 'volunteer' });
    }
  }

  onDayChange(dayId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDays.push(dayId);
      this.selectedTimes[dayId] = [];
    } else {
      this.selectedDays = this.selectedDays.filter(id => id !== dayId);
      delete this.selectedTimes[dayId];
    }
  }

  onTimeChange(dayId: number, timeId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTimes[dayId].push(timeId);
    } else {
      this.selectedTimes[dayId] = this.selectedTimes[dayId].filter(id => id !== timeId);
    }
  }

  isSelectionValid(): boolean {
    return this.selectedDays.length > 0 && Object.values(this.selectedTimes).some(times => times.length > 0);
  }

  nextStep() {
    this.formService.currentStep++;
  }

  previousStep() {
    this.formService.setVolunteerData({
      availableDays: this.selectedDays,
      availableHours: this.selectedTimes
    });

    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

  onSubmit() {
    // Validación de selección de día y hora
    if (!this.isSelectionValid()) {
      this.showValidationError = true;
      this.successMessage = null;
      this.errorMessage = null;
      return;
    }

    // Ocultar el mensaje de error de validación si se cumple la selección
    this.showValidationError = false;

    const personalData = this.formService.getFormData();
    personalData.name = personalData.name + ' ' + personalData.lastname;
    const availableDays = this.selectedDays.map(dayId => ({
      availableDay: {
        id: dayId,
        day_name: this.availableDays.find(day => day.id === dayId)?.day_name || ''
      },
      volunteer: { id: personalData.id }
    }));

    const availableHours = Object.entries(this.selectedTimes).map(([dayId, times]) => ({
      availableDay: {
        id: parseInt(dayId, 10),
        day_name: this.availableDays.find(day => day.id === parseInt(dayId, 10))?.day_name || ''
      },
      times: times.map(timeId => ({
        id: timeId,
        hour: this.availableTimes.find(time => time.id === timeId)?.hour || '',
        minutes: this.availableTimes.find(time => time.id === timeId)?.minutes || ''
      })),
      volunteer: { id: personalData.id }
    }));

    this.formService.setFormData({
      availableDays: availableDays,
      availableHours: availableHours
    });

    // Enviar formulario al backend
    this.volunteerService.createVolunteer(this.formService.getFormData()).subscribe(
      response => {
        this.successMessage = 'Registro de voluntario enviado exitosamente.';
        this.errorMessage = null;
        localStorage.setItem('successMessage', 'El voluntario fue registrado correctamente.');
        this.router.navigate(['/inicio']);
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Hubo un error al enviar el registro. Intente de nuevo.';
        console.error('Error submitting registration:', error);
      }
    );
  }
  saveVolunteerDataToStorage() {
    const volunteerData = {
      availableDays: this.selectedDays,
      availableHours: this.selectedTimes
    };
    sessionStorage.setItem('volunteerData', JSON.stringify(volunteerData));
  }
}

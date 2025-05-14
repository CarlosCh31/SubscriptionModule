import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { VolunteerService } from './volunteer.service';
import { Router } from '@angular/router';

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
    { id: 5, day_name: 'Viernes' },
    { id: 6, day_name: 'Sábado' },
    { id: 7, day_name: 'Domingo' }
  ];

  // Nueva lógica: estilo alarma
  selectedHour: string = '';
  selectedAlarmDays: number[] = [];
  alarmAvailabilities: { hour: string, days: number[] }[] = [];

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


    // Evita pantalla en blanco
    if (!this.formService.currentStep) {
      this.formService.currentStep = 2;
    }

    if (this.formService.getFormData().role !== 'volunteer') {
      this.formService.resetFormData();
      this.formService.setFormData({ role: 'volunteer' });
    }
  }

  toggleAlarmDay(dayId: number) {
    const index = this.selectedAlarmDays.indexOf(dayId);
    if (index >= 0) {
      this.selectedAlarmDays.splice(index, 1);
    } else {
      this.selectedAlarmDays.push(dayId);
    }
  }

  addAlarmAvailability() {
    if (this.selectedHour && this.selectedAlarmDays.length > 0) {
      this.alarmAvailabilities.push({
        hour: this.selectedHour,
        days: [...this.selectedAlarmDays]
      });
      this.selectedHour = '';
      this.selectedAlarmDays = [];
    }
  }

  formatDays(dayIds: number[]): string {
    return dayIds.map(id => this.getDayName(id)).join(', ');
  }

  getDayName(id: number): string {
    return this.availableDays.find(d => d.id === id)?.day_name || '';
  }

  isSelectionValid(): boolean {
    return this.alarmAvailabilities.length > 0;
  }

  previousStep() {
    this.formService.setVolunteerData({
      availableHours: this.alarmAvailabilities
    });

    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

  onSubmit() {
    if (!this.isSelectionValid()) {
      this.showValidationError = true;
      this.successMessage = null;
      this.errorMessage = null;
      return;
    }

    this.showValidationError = false;

    const personalData = this.formService.getFormData();
    personalData.name = personalData.name + ' ' + personalData.lastname;

    const availableHours = this.alarmAvailabilities.map(entry => ({
      times: [
        {
          hour: entry.hour.split(':')[0],
          minutes: entry.hour.split(':')[1]
        }
      ],
      availableDay: entry.days.map(dayId => ({
        id: dayId,
        day_name: this.getDayName(dayId)
      })),
      volunteer: { id: personalData.id }
    }));

    this.formService.setFormData({
      availableHours: availableHours
    });

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
      availableHours: this.alarmAvailabilities
    };
    sessionStorage.setItem('volunteerData', JSON.stringify(volunteerData));
  }
}

import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormService } from '../form/form.service';
import { AthleteService} from "../athlete-form/athlete.service";
import { VolleyballFormComponent } from "../volleyball-form/volleyball-form.component";
import { JudoWeightliftingFormComponent } from "../judo-weightlifting-form/judo-weightlifting-form.component";
import { AthletismFormComponent } from "../athletism-form/athletism-form.component";
import { CyclingFormComponent } from "../cycling-form/cycling-form.component";
import { SwimmingFormComponent } from "../swimming-form/swimming-form.component";
import { EquestrianFormComponent } from "../equestrian-form/equestrian-form.component";
import { RhythmicgymnasticsFormComponent } from "../rhythmicgymnastics-form/rhythmicgymnastics-form.component";

@Component({
  selector: 'app-sport-registration',
  standalone: true,
  templateUrl: './sport-registration.component.html',
  styleUrls: ['./sport-registration.component.css'],
  imports: [
    CommonModule,
    FormsModule, // Módulo para manejar formularios
    VolleyballFormComponent,
    JudoWeightliftingFormComponent,
    AthletismFormComponent,
    CyclingFormComponent,
    SwimmingFormComponent,
    EquestrianFormComponent,
    RhythmicgymnasticsFormComponent
  ]
})
export class SportRegistrationComponent implements OnInit {
  sportName: string = '';
  athleteName: string = 'Atleta';
  isSubmitting = false;
  athleteData: any = {};

  constructor(private route: ActivatedRoute, private formService: FormService, private router: Router, private athleteService: AthleteService) {}

  ngOnInit() {
    this.sportName = this.route.snapshot.paramMap.get('sport') ?? '';
    this.athleteName = this.formService.getFormData()?.name || 'Atleta';

    // 🔹 Cargar datos guardados al iniciar
    const savedData = this.formService.getAthleteData();
    this.athleteData = savedData;
    //this.athleteData = savedData ? savedData : { sportInfo: {} };
  }

  goBack() {
    // 🔹 Guardar antes de volver
    this.formService.setAthleteData(this.athleteData);
    this.router.navigate(['/athlete-form']);
  }

  saveSportInfo() {
    this.formService.setAthleteData(this.athleteData);
  }

  submitForm() {
    if (!this.sportName) {
      alert('Por favor selecciona un deporte.');
      return;
    }

    this.formService.setAthleteData(this.athleteData);

    const athleteData = this.formService.getFormData();
    athleteData.sport = this.sportName;
    athleteData.id = this.formService.getFormData().id;

    // 🔹 Asignar identification a id antes de enviar
    //athleteData.id = athleteData.identification;

    console.log("ID enviado:", athleteData.id);
    console.log("Enviando datos del atleta a la API:", athleteData);

    this.isSubmitting = true;
    this.athleteService.createAthlete(athleteData).subscribe({
      next: (response) => {
        console.log('Atleta registrado con éxito:', response);
        alert('¡Inscripción completada con éxito!');
        this.formService.resetFormData();
        this.router.navigate(['/confirmation']);
      },
      error: (error) => {
        console.error('Error al registrar el atleta:', error);
        alert('Hubo un error al registrar el atleta. Inténtalo nuevamente.');
        this.isSubmitting = false;
      }
    });
  }

}

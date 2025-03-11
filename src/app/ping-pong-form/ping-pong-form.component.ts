import { Component,Input } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-ping-pong-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './ping-pong-form.component.html',
  styleUrl: './ping-pong-form.component.css'
})
export class PingPongFormComponent {
  @Input() sportName: string = '';
  PingPongForm: any;
  athlete: any;
  levels = ['Alto', 'Medio', 'Bajo'];

  constructor(
    private formService : FormService
){}

  disabilities = ['Discapacidad Visual', 'Discapacidad Auditiva', 'Discapacidad Física', 'Discapacidad Intelectual'];
  testTypes = ['Prueba dobles unificadas', 'Prueba dobles', 'Prueba solos'];

  athleteData = {
    level: '',
    disabilityProof: null,
    testType: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.athleteData.disabilityProof = file;
    } else {
      alert('Por favor, suba un archivo PDF válido.');
    }
  }

  onChangeNivel($event: any) {
    this.formService.setFormData({level: this.athleteData.level});
  }
 
  nextStep() {
    if (this.formService.currentStep === 1) {

    }
    if (this.formService.currentStep < 3) {
      this.formService.currentStep++;
    }
  }
  
  previousStep() {
    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

}

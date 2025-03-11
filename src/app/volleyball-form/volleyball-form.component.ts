import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-volleyball-form',
  templateUrl: './volleyball-form.component.html',
  styleUrls: ['./volleyball-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class VolleyballFormComponent implements OnInit {

  @ViewChild('athleteForm') athleteForm!: NgForm;
  @Input() athleteData: any = {};
  @Input() sportName: string = '';

  skillLevels: string[] = ['Alto', 'Medio', 'Bajo'];
  submitted: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.athleteData.skillLevel) {
      this.athleteData.skillLevel = ''; // Evitar errores si `skillLevel` es undefined
    }
  }

  onSkillLevelChange(value: string) {
    this.athleteData.skillLevel = value; // ✅ Guardar en `athleteData`
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (!this.athleteData.skillLevel) {
      console.log('Por favor seleccione un nivel de habilidad.');
    } else {
      console.log('Formulario enviado correctamente', this.athleteData);
    }
  }
}

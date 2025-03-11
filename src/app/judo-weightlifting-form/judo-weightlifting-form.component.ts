import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-judo-weightlifting-form',
  templateUrl: './judo-weightlifting-form.component.html',
  styleUrls: ['./judo-weightlifting-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class JudoWeightliftingFormComponent implements OnInit {

  @ViewChild('athleteForm') athleteForm!: NgForm;
  @Input() athleteData: any = { // ✅ Ahora usa `athleteData` en lugar de `weightData`
    bodyWeight: ''
  };
  @Input() sportName: string = '';

  weightError: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onWeightChange(value: string) {
    const weight = parseFloat(value);
    this.weightError = isNaN(weight) || weight <= 0;
    if (!this.weightError) {
      this.athleteData.bodyWeight = weight; // ✅ Guardar en `athleteData`
    }
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.weightError || !this.athleteData.bodyWeight) {
      console.log('Por favor ingrese un peso válido en kg.');
    } else {
      console.log('Formulario enviado correctamente', this.athleteData);
    }
  }
}

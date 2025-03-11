import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-kayak-form',
  templateUrl: './kayak-form.component.html',
  styleUrls: ['./kayak-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class KayakFormComponent implements OnInit {

  @ViewChild('athleteForm') athleteForm!: NgForm;
  @Input() kayakData: any = {
    selectedDistances: []
  };
  @Input() sportName: string = '';
  @Input() athleteData: any;

  distanceOptions: string[] = ['200mts', '500mts'];
  maxSelectionError: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onDistanceSelect(distance: string) {
    const index = this.kayakData.selectedDistances.indexOf(distance);

    if (index === -1) {
      if (this.kayakData.selectedDistances.length < 2) {
        this.kayakData.selectedDistances.push(distance);
        this.maxSelectionError = false;
      } else {
        this.maxSelectionError = true;
      }
    } else {
      this.kayakData.selectedDistances.splice(index, 1);
      this.maxSelectionError = false;
    }

    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.kayakData.selectedDistances.length === 0) {
      console.log('Por favor seleccione al menos una distancia.');
    } else {
      console.log('Formulario enviado correctamente', this.kayakData);
    }
  }
}


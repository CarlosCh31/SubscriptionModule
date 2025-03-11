import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { FormService } from '../form/form.service';

@Component({
  selector: 'app-cycling-form',
  templateUrl: './cycling-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CommonModule
  ],
  styleUrls: ['./cycling-form.component.css']
})
export class CyclingFormComponent implements OnInit {
  @Input() sportName: string = '';
  @Input() athleteData: any = { sportInfo: {} };

  selectedCategory: string = '';
  selectedEvents: string[] = [];
  maxSelectionError: boolean = false;
  selectedCategoryOptions: string[] = [];

  categories = [
    { name: 'Nivel 1', options: ['500mts contra reloj', '1km contra reloj', '2km contra reloj'] },
    { name: 'Nivel 2', options: ['500mts contra reloj', '1km contra reloj', '2km contra reloj'] }
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    if (!this.athleteData.sportInfo) {
      this.athleteData.sportInfo = {};
    }

    if (!this.athleteData.sportInfo.cycling) {
      // Inicializar si no hay datos guardados
      this.athleteData.sportInfo.cycling = {
        selectedCategory: '',
        selectedEvents: []
      };
    } else {
      // Recuperar datos guardados
      this.selectedCategory = this.athleteData.sportInfo.cycling.selectedCategory;
      this.selectedEvents = this.athleteData.sportInfo.cycling.selectedEvents || [];

      // Establecer opciones basadas en la categoría guardada
      const category = this.categories.find(cat => cat.name === this.selectedCategory);
      this.selectedCategoryOptions = category ? category.options : [];
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.selectedEvents = [];
    this.maxSelectionError = false;

    const category = this.categories.find(cat => cat.name === this.selectedCategory);
    this.selectedCategoryOptions = category ? category.options : [];

    // 🔹 Guardar en `FormService`
    this.athleteData.sportInfo.cycling.selectedCategory = this.selectedCategory;
    this.athleteData.sportInfo.cycling.selectedEvents = this.selectedEvents;
    this.formService.setAthleteData(this.athleteData);
  }

  onEventSelect(event: any) {
    const selectedEvent = event.target.value;

    if (event.target.checked) {
      if (this.selectedEvents.length < 2) {
        this.selectedEvents.push(selectedEvent);
      } else {
        event.target.checked = false;
        this.maxSelectionError = true;
      }
    } else {
      this.selectedEvents = this.selectedEvents.filter(e => e !== selectedEvent);
      this.maxSelectionError = false;
    }

    // 🔹 Guardar en `FormService`
    this.athleteData.sportInfo.cycling.selectedEvents = this.selectedEvents;
    this.formService.setAthleteData(this.athleteData);
  }

  isDisabled(option: string): boolean {
    return this.selectedEvents.length >= 2 && !this.selectedEvents.includes(option);
  }
}

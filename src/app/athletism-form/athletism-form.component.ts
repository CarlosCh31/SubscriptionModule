import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FormService } from '../form/form.service';
import { NgForOf, NgIf, CommonModule } from "@angular/common";

@Component({
  selector: 'app-athletism-form',
  templateUrl: './athletism-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CommonModule
  ],
  styleUrls: ['./athletism-form.component.css']
})

export class AthletismFormComponent implements OnInit {
  @Input() sportName: string = '';
  @Input() athleteData: any = { sportInfo: {} };

  selectedCategory: string = '';
  selectedEvents: string[] = [];
  maxSelectionError: boolean = false;
  selectedCategoryOptions: string[] = [];

  categories = [
    { name: 'Nivel 1', options: ['25mts', '50mts', 'Lanzamiento de pelota de softball', 'Salto largo con impulso'] },
    { name: 'Nivel 2', options: ['100mts', '200mts', 'Lanzamiento de bala', 'Salto largo con impulso'] },
    { name: 'Nivel 3', options: ['400mts', '800mts', 'Lanzamiento de bala', 'Salto largo con impulso'] },
    { name: 'Nivel 4', options: ['1500mts', '3000mts', '5000mts', 'Lanzamiento de bala', 'Salto largo con impulso'] },
    { name: 'Nivel 5 (Silla de ruedas)', options: ['25mts', '30mts', 'Lanzamiento de bola de softball (silla de ruedas)'] }
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    if (!this.athleteData.sportInfo) {
      this.athleteData.sportInfo = {};
    }

    if (!this.athleteData.sportInfo.athletism) {
      // Inicializar si no hay datos guardados
      this.athleteData.sportInfo.athletism = {
        selectedCategory: '',
        selectedEvents: []
      };
    } else {
      // Recuperar datos guardados
      this.selectedCategory = this.athleteData.sportInfo.athletism.selectedCategory;
      this.selectedEvents = this.athleteData.sportInfo.athletism.selectedEvents || [];

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
    this.athleteData.sportInfo.athletism.selectedCategory = this.selectedCategory;
    this.athleteData.sportInfo.athletism.selectedEvents = this.selectedEvents;
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
    this.athleteData.sportInfo.athletism.selectedEvents = this.selectedEvents;
    this.formService.setAthleteData(this.athleteData);
  }

  isDisabled(option: string): boolean {
    return this.selectedEvents.length >= 2 && !this.selectedEvents.includes(option);
  }
}

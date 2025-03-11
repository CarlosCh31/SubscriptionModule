import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { FormService } from "../form/form.service";

@Component({
  selector: 'app-swimming-form',
  templateUrl: './swimming-form.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, CommonModule],
  styleUrls: ['./swimming-form.component.css']
})
export class SwimmingFormComponent implements OnInit {
  @Input() sportName: string = '';
  @Input() athleteData: any;

  selectedCategory: string = '';
  selectedEvents: string[] = [];
  maxSelectionError: boolean = false;
  selectedCategoryOptions: string[] = [];

  categories = [
    { name: 'Categoría 1', options: ['25mts estilo libre', '25mts dorso', '25mts pecho', '25mts mariposa'] },
    { name: 'Categoría 2', options: ['50mts estilo libre', '50mts dorso', '50mts pecho', '50mts mariposa'] },
    { name: 'Categoría 3', options: ['100mts estilo libre', '100mts dorso', '100mts pecho', '100mts mariposa', '100mts combinado'] },
    { name: 'Categoría 4', options: ['200mts estilo libre', '200mts dorso', '200mts pecho', '200mts mariposa', '400mts libre'] },
    { name: 'Aguas abiertas 1500mts', options: [] }
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    if (!this.athleteData.sportInfo) {
      this.athleteData.sportInfo = {};
    }

    if (!this.athleteData.sportInfo.swimming) {
      // Inicializar si no hay datos guardados
      this.athleteData.sportInfo.swimming = {
        selectedCategory: '',
        selectedEvents: []
      };
    } else {
      // Recuperar datos guardados
      this.selectedCategory = this.athleteData.sportInfo.swimming.selectedCategory;
      this.selectedEvents = this.athleteData.sportInfo.swimming.selectedEvents || [];

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
    this.athleteData.sportInfo.swimming.selectedCategory = this.selectedCategory;
    this.athleteData.sportInfo.swimming.selectedEvents = this.selectedEvents;
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
    this.athleteData.sportInfo.swimming.selectedEvents = this.selectedEvents;
    this.formService.setAthleteData(this.athleteData);
  }

  isDisabled(option: string): boolean {
    return this.selectedEvents.length >= 2 && !this.selectedEvents.includes(option);
  }
}

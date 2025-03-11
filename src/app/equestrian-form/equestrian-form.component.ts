import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { FormService } from "../form/form.service";

@Component({
  selector: 'app-equestrian-form',
  templateUrl: './equestrian-form.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, CommonModule],
  styleUrls: ['./equestrian-form.component.css']
})
export class EquestrianFormComponent implements OnInit {
  @Input() athleteData: any;
  @Input() sportName: string = '';

  selectedCategories: string[] = [];

  eventOptions: string[] = [
    'Trail',
    'Adiestramiento',
    'Barriles',
    'English equitation',
    'Equitation jumping',
    'Vaquera equitation',
    'Showmanship',
    'Cuadrillas',
    'Team Relays',
    'Drill team'
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    if (!this.athleteData.sportInfo) {
      this.athleteData.sportInfo = {};
    }

    if (!this.athleteData.sportInfo.equestrian) {
      // Inicializar datos si no hay registros previos
      this.athleteData.sportInfo.equestrian = {
        selectedCategories: []
      };
    } else {
      // Cargar los datos guardados
      this.selectedCategories = this.athleteData.sportInfo.equestrian.selectedCategories || [];
    }
  }

  onCategoryChange(event: any) {
    const category = event.target.value;

    if (event.target.checked) {
      if (this.selectedCategories.length < 2) {
        this.selectedCategories.push(category);
      } else {
        event.target.checked = false;
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(e => e !== category);
    }

    // 🔹 Guardar en `FormService`
    this.athleteData.sportInfo.equestrian.selectedCategories = this.selectedCategories;
    this.formService.setAthleteData(this.athleteData);
  }

  isDisabled(category: string): boolean {
    return this.selectedCategories.length >= 2 && !this.selectedCategories.includes(category);
  }
}

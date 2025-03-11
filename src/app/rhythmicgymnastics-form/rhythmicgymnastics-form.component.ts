import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { FormService } from "../form/form.service";

@Component({
  selector: 'app-rhythmicgymnastics-form',
  templateUrl: './rhythmicgymnastics-form.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, CommonModule],
  styleUrls: ['./rhythmicgymnastics-form.component.css']
})
export class RhythmicgymnasticsFormComponent implements OnInit {
  @Input() sportName: string = '';
  @Input() athleteData: any;

  selectedLevel: string = '';

  levelOptions: string[] = [
    'Nivel A Silla de ruedas: Cuerda, aro, pelota, cinta',
    'Nivel B: Cuerda, aro, pelota, cinta',
    'Nivel 1: Cuerda, aro, pelota, cinta',
    'Nivel 2: Aro, pelota, mazas, cinta',
    'Nivel 3: Cuerda, pelota, mazas, cinta',
    'Nivel 4: Aro, pelota, mazas, cinta'
  ];

  constructor(private formService: FormService) {}

  ngOnInit() {
    if (!this.athleteData.sportInfo) {
      this.athleteData.sportInfo = {};
    }

    if (!this.athleteData.sportInfo.rhythmicgymnastics) {
      // Inicializar datos si no hay registros previos
      this.athleteData.sportInfo.rhythmicgymnastics = {
        selectedLevel: ''
      };
    } else {
      // Cargar los datos guardados
      this.selectedLevel = this.athleteData.sportInfo.rhythmicgymnastics.selectedLevel || '';
    }
  }

  onLevelChange(event: any) {
    this.selectedLevel = event.target.value;

    // 🔹 Guardar en `FormService`
    this.athleteData.sportInfo.rhythmicgymnastics.selectedLevel = this.selectedLevel;
    this.formService.setAthleteData(this.athleteData);
  }
}

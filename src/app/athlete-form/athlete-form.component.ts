import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SportService } from '../services/sport.service';
import { FormService } from '../form/form.service';
import { FormComponent } from "../form/form.component";
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { AthleteService } from "./athlete.service";
import { Router } from "@angular/router";
import { LateralityService } from '../services/laterality.service';
import { DisabilityTypeService } from '../services/disability-type.service';
import { FileStorageService } from "../services/file-storage.service";
import { Sport } from "../services/sport.service"

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css'],
  imports: [
    FormComponent,
    FormsModule,
    NgForOf,
    NgIf,
  ]
})

export class AthleteFormComponent implements OnInit {
  @ViewChild('sportComboBox', { static: false }) sportComboBox!: ElementRef;
  sports: Sport[] = [];
  lateralityOptions: any[] = [];
  disabilityTypes: any[] = [];
  registration = {
    laterality: null // Dato de lateralidad enlazado al formulario
  };
  selectedSport: Sport | null = null;
  selectedSportId: number | null = null;
  loading = false;
  athleteData: any = {
    laterality: null,
    disabilityProof: null,
    disability_type: null,
    sportInfo: {
      sport: null
    }
  };

  private errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private lateralityService: LateralityService,
    protected formService: FormService,
    private sportService: SportService,
    private cdRef: ChangeDetectorRef,
    private athleteService: AthleteService,
    private router: Router,
    private disabilityTypeService: DisabilityTypeService,
    private fileStorageService: FileStorageService
  ) {}

  showMessage: boolean = false;
  success: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadSports();
    this.loadDisabilityTypes();
    this.loadLateralityOptions();

    // Recuperar datos previos del formulario
    const savedData = this.formService.getAthleteData();
    if (savedData) {
      this.athleteData.laterality= savedData.laterality;
      this.athleteData.disability_type= savedData.disability_type;
      this.athleteData.disabilityProof= savedData.disabilityProof;
      this.athleteData.sportInfo = savedData.sportInfo || {};
      this.selectedSport = savedData.sportInfo?.sport || null;
      this.selectedSportId = savedData.sportInfo?.sport?.id || null;
      this.registration.laterality = savedData.laterality || null;
    }
  }

  loadDisabilityTypes() {
    this.disabilityTypeService.getDisabilityTypes().subscribe(
      data => {
        this.disabilityTypes = data;
      },
      error => {
        console.error('Error al cargar tipos de discapacidad:', error);
      }
    );
  }

  loadLateralityOptions() {
    this.lateralityService.getLateralityOptions().subscribe(
      data => {
        this.lateralityOptions = data;
      },
      error => {
        console.error('Error al cargar lateralidad:', error);
      }
    );
  }

  loadSports() {
    this.loading = true;
    this.sportService.getAllSports().subscribe(
      (response: Sport[]) => {
        this.sports = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar deportes:', error);
        this.loading = false;
      }
    );
  }

  onSportChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sportId = parseInt(selectElement.value, 10);

    this.selectedSport = this.sports.find(sport => sport.id === sportId) || null;
    this.formService.setAthleteData({ sport: this.selectedSport });

    console.log("Deporte seleccionado:", this.selectedSport?.name);
  }




  previousStep() {
    this.formService.setAthleteData({
      sportInfo: this.athleteData.sportInfo,
      laterality: this.registration.laterality,
      sport: this.selectedSport
    });

    this.formService.setFormData({
      ...this.formService.getFormData(),
      id: this.formService.getFormData().id
    });

    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0];

    if (file.type === 'application/pdf') {
      this.athleteData.disabilityProof = file;
      this.fileStorageService.setDisabilityProof(file);
      this.formService.setFormData({ disabilityProof: file });
      this.formService.setAthleteData({ disabilityProof: file });
    } else {
      alert('Por favor, suba un archivo en formato PDF.');
    }
  }

  clearFile(): void {
    this.athleteData.disabilityProof = null;
    this.fileStorageService.clearDisabilityProof();
  }

  trackBySportId(index: number, sport: Sport): number {
    return sport.id;
  }

  goToSportRegistration() {
    this.submitted = true;
    if (!this.selectedSport || !this.athleteData.disability_type ||
      !this.athleteData.laterality || !this.athleteData.disabilityProof) {
      console.log("Faltan campos por completar.");
      return;
    }

    // Guardar datos antes de avanzar
    const currentData = this.formService.getFormData();

    this.formService.setFormData({
      ...currentData,
      laterality: this.athleteData.laterality,
      disability_type: this.athleteData.disability_type,
      sport: this.selectedSport
    });

    this.router.navigate(['/registro-deporte', this.selectedSport.name]);
  }

}

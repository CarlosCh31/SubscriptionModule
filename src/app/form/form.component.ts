import { ChangeDetectorRef, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProvinceService } from '../services/province.service';
import { RegionService } from '../services/region.service';
import { CantonService } from '../services/canton.service';
import { FormService } from './form.service';
import axios from 'axios';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { FormDataService } from "../services/form-data.service";
import { GlobalRegionService } from '../services/global-region.service';
import { CountryService } from '../services/country.service';

// Interfaces for province, canton, and region
interface Province {
  id: number;
  name: string;
}
interface Canton {
  id: number;
  name: string;
  provinceId: number;
}
interface Region {
  id: number;
  name: string;
}
export interface Sport {
  id: number;
  name: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmationDialogComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  @ViewChild('registrationForm', { static: false }) registrationForm!: NgForm;

  roleType: 'atleta' | 'voluntario' = 'atleta';
  currentStep = 1;
  sports: Sport[] = [];
  globalRegions: any[] = [];
  countries: any[] = [];

  // Form model with initial values
  registration = {
    id: '',
    name: '',
    nameAux: '',
    birthdate: '' as string | Date,
    canton_id: null as Canton | null | undefined,
    citizenship: undefined as string | undefined,
    email: '',
    idType: 'física',
    phone_number: '',
    province_id: null as Province | null | undefined,
    region_id: null as Region | null | undefined,
    worldRegion: null,
    country: null,
    lastname: ''
  };
  selectedSport: Sport | null = null;
  laterality: string | null = null;
  disability: string | null = null;
  disabilityProof: File | null = null;
  loading = false;
  showConfirmation = false;
  confirmationMessage = '';
  showFormValidationDialog: boolean = false;
  confirmationMessageForm = '';

  birthdateError: any;

  cantons: Canton[] = [];
  filteredCountries: any[] = [];
  regions: Region[] = [];
  provinces: Province[] = [];
  latinAmericanCountries: string[] = [];
  districts: any[] = [];

  // World regions and countries

  days: number[] = [];
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];
  years: number[] = [];
  selectedDay: number | null = null;
  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  invalidDate: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: FormService,
    private regionService: RegionService,
    private provinceService: ProvinceService,
    private cantonService: CantonService,
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router,
    private globalRegionService: GlobalRegionService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const formData = this.formService.getFormData();
    if (formData) {
      this.registration = {
        ...this.registration,
        ...formData
      };

      this.selectedDay = formData.selectedDay || null;
      this.selectedMonth = formData.selectedMonth || null;
      this.selectedYear = formData.selectedYear || null;

      if (this.selectedDay && this.selectedMonth && this.selectedYear) {
        this.registration.birthdate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
      }

    }
    this.loadGlobalRegions();
    this.loadProvinces();
    this.populateYears();
    this.populateDays();
    this.validateBirthdate();
    this.loadRegions();
    this.loadCountries();
  }
  loadCountries() {
    this.countryService.getAllCountries().subscribe(
        data => {
          this.countries = data;
          console.log('PAISES OBTENIDOS: ' + this.countries.map(console.log));
        },
        error => {
          console.error('Error al cargar los países:', error);
        }
    );
  }

  onWorldRegionChange(regionId: number) {
    console.log('region mundial seleccionada: ' + regionId);
    this.filteredCountries = this.countries.filter(country => country.region.id == regionId);
    console.log('Paises Filtrados: '+ this.filteredCountries);
  }

  loadGlobalRegions() {
    this.globalRegionService.getGlobalRegions().subscribe(
      data => {
        this.globalRegions = data;
      },
      error => {
        console.error('Error al cargar las regiones globales:', error);
      }
    );
  }


  navigateToHome() {
    this.router.navigate(['/']); // Ajusta la ruta según tus necesidades
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 70;
    const maxYear = currentYear - 18;

    for (let i = maxYear; i >= minYear; i--) {
      this.years.push(i);
    }
  }

  populateDays() {
    const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Days from 1 to daysInMonth
  }

  getDaysInMonth(month: number | null, year: number | null): number {
    if (!month || !year) {
      return 31; // Default to 31 if no month or year is selected
    }
    return new Date(year, month, 0).getDate();
  }

  validateBirthdate() {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      const selectedDate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 70, 0, 1);
      const maxDate = new Date(currentDate.getFullYear() - 18, 11, 31);

      if (selectedDate >= minDate && selectedDate <= maxDate && !isNaN(selectedDate.getTime())) {
        this.invalidDate = false;
        this.birthdateError = null;
      } else {
        this.invalidDate = true;
        this.birthdateError = 'La fecha debe estar entre hace 70 y 18 años.';
      }
    } else {
      this.invalidDate = false;
      this.birthdateError = null;
    }
  }

  onCitizenshipChange() {
    this.registration.citizenship = this.registration.citizenship === 'nacional' ? 'Costarricense' : undefined;
    this.formDataService.setFormData({ citizenship: this.registration.citizenship });
  }


  getIdentificationPattern() {
    switch (this.registration.idType) {
      case 'física':
        return '\\d{1}-\\d{4}-\\d{4}';
      case 'dimex':
        return '\\d{4}-\\d{6}-\\d{2}';
      case 'pasaporte':
        return '[A-Za-z0-9]{5,10}';
      case 'juridica':
        return '\\d{1}-\\d{3}-\\d{6}';
      default:
        return '';
    }
  }

  validateIdentification() {
    const rawIdentification = this.registration.id.replace(/-/g, '');
    const pattern = new RegExp(this.getIdentificationPattern());

    if (!pattern.test(rawIdentification)) {
      return `Identificación inválida. Debe seguir el formato: ${this.getIdentificationPlaceholder()}`;
    }
    return '';
  }

  getIdentificationPlaceholder() {
    switch (this.registration.idType) {
      case 'física':
        return '1-XXXX-XXXX';
      case 'juridica':
        return 'X-XXX-XXXXXX';
      case 'dimex':
        return 'XXXX-XXXXXX-XX';
      case 'pasaporte':
        return 'Alfanumérico (5-10 caracteres)';
      default:
        return '';
    }
  }

  updateIdentification(value: string) {
    this.registration.id = this.removeIdentificationFormat(value);
    this.applyIdentificationFormat();
  }

  private removeIdentificationFormat(value: string) {
    return value.replace(/\D/g, '');
  }

  validatePhoneNumber() {
    const rawPhoneNumber = this.registration.phone_number.replace(/\D/g, '');

    if (rawPhoneNumber.length !== 8) {
      return 'El número de teléfono debe tener 8 dígitos.';
    }

    const validPrefix = /^[2|6|7|8]/;
    if (!validPrefix.test(rawPhoneNumber)) {
      return 'El número de teléfono debe comenzar con 2, 6, 7 u 8.';
    }

    return '';
  }

  extraerDatosPersona(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the element that contains "Nombre Completo" text
    const nombreCompletoElement = Array.from(doc.querySelectorAll('div')).find(div =>
      div.textContent?.includes("Nombre Completo")
    );
    const nombreCompleto = nombreCompletoElement?.nextElementSibling?.textContent || '';

    // Find the element that contains "Fecha Nacimiento" text
    const fechaNacimientoElement = Array.from(doc.querySelectorAll('div')).find(div =>
      div.textContent?.includes("Fecha Nacimiento")
    );
    const fechaNacimiento = fechaNacimientoElement?.nextElementSibling?.textContent || '';

    return { nombreCompleto, fechaNacimiento };
  }

  searchByCedula() {
    if (this.registration.id) {
      const cedula = this.registration.id.replace(/-/g, '');
      const tipoCedula = this.registration.idType;
      this.loading = true; // Set loading to true

      this.formService.searchByCedula(cedula, tipoCedula).subscribe(
        response => {
          this.loading = false; // Stop loading

          if (response.results && response.results.length > 0) {
            const personData = response.results[0];

            // Fill form fields
            this.registration.name = `${personData.firstname1} ${personData.firstname2}`.trim();
            this.registration.lastname = `${personData.lastname1} ${personData.lastname2}`.trim();

            // Show confirmation dialog
            this.confirmationMessage = `¿El nombre ${this.registration.name} corresponde a tu identificación?`;
            this.showConfirmation = true;

            this.cdr.detectChanges(); // Ensure Angular updates the form
          } else {
            console.error('No results found');
          }
        },
        error => {
          this.loading = false; // Stop loading on error
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  applyPhoneNumberMask() {
    let value = this.registration.phone_number.replace(/\D/g, '');
    if (value.length >= 8) {
      this.registration.phone_number = `+506 ${value.slice(0, 4)}-${value.slice(4, 8)}`;
    }
  }

  private async verifyIdentification(id: string) {
    const user =  this.registration.id;
    if (!user) {
      this.showErrorDialog("No se encontró a la persona en el sistema.");
      return;
    }
    const confirmed = await this.showConfirmationDialog(`¿Esta es tu identificación: ${id}?`);
    if (!confirmed) {
      this.showErrorDialog("Por favor verifica tu identificación.");
    } else {
    }
  }

  private showErrorDialog(message: string) {
    alert(message);
  }

  private showConfirmationDialog(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const confirmed = confirm(message);
      resolve(confirmed);
    });
  }

  onIdentificationChange() {
    this.formService.setFormData({ id: this.registration.id });
  }

  onNameChange($event: any) {
    this.formService.setFormData({ name: this.registration.name });
  }

  onLastNameChange($event: any) {
    this.formService.setFormData({ lastname: this.registration.lastname });
  }


  onBirthdateChange($event: any) {
    this.formService.setFormData({ birthdate: this.registration.birthdate });
  }

  onEmailChange($event: any) {
    this.formService.setFormData({ email: this.registration.email });
  }

  onPhoneNumberChange($event: any) {
    this.formService.setFormData({ phone_number: this.registration.phone_number });
  }

  onNationalityChange($event: any) {
    this.registration.citizenship = this.registration.citizenship === 'nacional' ? 'Costarricense' : undefined;
    this.formDataService.setFormData({ citizenship: this.registration.citizenship });
  }

  onProvinceChange(province: Province | null) {
    this.registration.province_id = province;
    this.filterCantonsByProvince(province ? province.id : null);
    this.registration.canton_id = null;
  }


  loadProvinces() {
    this.formService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        // Establecer provincia seleccionada previamente
        if (this.registration.province_id) {
          this.registration.province_id = this.provinces.find(
            (province) => province.id === this.registration.province_id?.id
          ) || null;

          // Cargar cantones solo si ya hay una provincia seleccionada
          if (this.registration.province_id) {
            this.filterCantonsByProvince(this.registration.province_id.id);
          }
        }
      },
      error => {
        console.error('Error al cargar las provincias:', error);
      }
    );
  }

  loadCantons() {
    this.formService.getCantons().subscribe(
      (data: Canton[]) => { // especificamos el tipo de 'data'
        this.cantons = data.filter((canton: Canton) => canton.provinceId === this.registration.province_id?.id); // especificamos el tipo de 'canton'

        // Establecer cantón previamente seleccionado
        if (this.registration.canton_id) {
          this.registration.canton_id = this.cantons.find(
            (canton: Canton) => canton.id === this.registration.canton_id?.id
          ) || null;
        }
      },
      error => {
        console.error('Error al cargar los cantones:', error);
      }
    );
  }


  loadRegions() {
    this.formService.getRegions().subscribe(
      data => {
        this.regions = data;
        // Establecer región seleccionada previamente
        if (this.registration.region_id) {
          this.registration.region_id = this.regions.find(region_id => region_id.id === this.registration.region_id?.id) || null;
        }
      },
      error => {
        console.error('Error al cargar las regiones:', error);
      }
    );
  }


  collectFormData() {
    if (!this.registrationForm) {
      console.error('Formulario no inicializado');
      return;
    }
    if (this.registrationForm.form) {
      this.registrationForm.form.markAllAsTouched();
    }
    if (this.registrationForm.valid) {
      const personalDataToStore = {
        id: this.registration.id,
        idType: this.registration.idType,
        name: this.registration.name,
        lastname: this.registration.lastname || null,
        birthdate: this.registration.birthdate || null,
        email: this.registration.email || null,
        phone_number: this.registration.phone_number || null,
        citizenship: this.registration.citizenship || null,
        province_id: this.registration.province_id ? this.registration.province_id : null,
        canton_id: this.registration.canton_id ? this.registration.canton_id : null,
        region_id: this.registration.region_id ? this.registration.region_id : null,
      };
      this.formService.setFormData(personalDataToStore);
      console.log("Datos personales guardados temporalmente:", personalDataToStore);

      this.nextStep();
    }
  }

  onDayChange(day: string) {
    const parsedDay = parseInt(day, 10);
    if (!isNaN(parsedDay)) {
      this.selectedDay = parsedDay;
      if (this.selectedMonth && this.selectedYear) {
        this.updateBirthdate();
      }
    }
  }

  onMonthChange(month: string) {
    const parsedMonth = parseInt(month, 10);
    if (!isNaN(parsedMonth)) {
      this.selectedMonth = parsedMonth;
      if (this.selectedDay && this.selectedYear) {
        this.updateBirthdate();
      }
    }
  }

  onYearChange(year: string) {
    const parsedYear = parseInt(year, 10);
    if (!isNaN(parsedYear)) {
      this.selectedYear = parsedYear;
      if (this.selectedDay && this.selectedMonth) {
        this.updateBirthdate();
      }
    }
  }

  updateBirthdate() {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      const birthdate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
      const year = birthdate.getFullYear();
      const month = String(birthdate.getMonth() + 1).padStart(2, '0');
      const day = String(birthdate.getDate()).padStart(2, '0');

      // Formatear la fecha solo con año, mes y día
      this.registration.birthdate = `${year}-${month}-${day}`;

      this.formService.setFormData({ birthdate: this.registration.birthdate });
      console.log("Fecha de nacimiento actualizada:", this.registration.birthdate);
    } else {
      console.error("Faltan campos para la fecha.");
    }
  }


  filterCantonsByProvince(provinceId: number | null) {
    if (provinceId === null || provinceId === undefined) {
      this.cantons = [];
    } else {
      this.formService.getCantons().subscribe(
        (cantons: Canton[]) => {
          this.cantons = cantons.filter(canton => canton.provinceId === provinceId);
          if (this.registration.canton_id) {
            this.registration.canton_id = this.cantons.find(canton => canton.id === this.registration.canton_id?.id) || null;
          }
        },
        error => {
          console.error('Error al cargar los cantones:', error);
        }
      );
    }
  }

  applyIdentificationFormat() {
    const idType = this.registration.idType;
    let value = this.registration.id.replace(/\D/g, '');
    if (idType === 'física' && value.length > 0) {
      this.registration.id = value
        .replace(/^(\d{1})(\d{0,4})(\d{0,4})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'dimex' && value.length > 0) {
      this.registration.id = value
        .replace(/^(\d{4})(\d{0,6})(\d{0,2})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'juridica' && value.length > 0) {
      this.registration.id = value
        .replace(/^(\d{1})(\d{0,3})(\d{0,6})$/, (_, g1, g2, g3) => {
          return `${g1}${g2 ? '-' + g2 : ''}${g3 ? '-' + g3 : ''}`;
        });
    } else if (idType === 'pasaporte') {
      this.registration.id = this.registration.id.toUpperCase();
    }
  }

  onIdentificationInput(value: string) {
    this.registration.id = value;
    this.applyIdentificationFormat();
  }

  nextStep() {
    this.formService.setFormData({
    id: this.registration.id,
    idType: this.registration.idType,
    fullName: this.registration.name + this.registration.lastname,
    name: this.registration.name,
    lastname: this.registration.lastname,
    birthdate: this.registration.birthdate,
    email: this.registration.email,
    phone_number: this.registration.phone_number,
    citizenship: this.registration.citizenship,
    province_id: this.registration.province_id,
    canton_id: this.registration.canton_id,
    region_id: this.registration.region_id,
    worldRegion: this.registration.worldRegion,
    country: this.registration.country,
    selectedDay: this.selectedDay,
    selectedMonth: this.selectedMonth,
    selectedYear: this.selectedYear
    });

    if (this.formService.currentStep < 3) {
      this.formService.currentStep++;
    }
  }

  previousStep() {
    // Almacenar datos actuales en el servicio
    this.formService.setFormData({
      id: this.registration.id,
      idType: this.registration.idType,
      name: this.registration.nameAux,
      lastname: this.registration.lastname,
      birthdate: this.registration.birthdate,
      email: this.registration.email,
      phone_number: this.registration.phone_number,
      citizenship: this.registration.citizenship,
      province_id: this.registration.province_id,
      canton_id: this.registration.canton_id,
      region_id: this.registration.region_id,
      worldRegion: this.registration.worldRegion,
      country: this.registration.country,
      selectedDay: this.selectedDay,
      selectedMonth: this.selectedMonth,
      selectedYear: this.selectedYear
    });

    // Cambiar de paso y repoblar datos guardados si existen
    if (this.formService.currentStep > 1) {
      this.formService.currentStep--;

      // Cargar provincias y, si hay una seleccionada, cargar cantones y región según corresponda
      this.loadProvinces();
      if (this.registration.province_id) {
        this.filterCantonsByProvince(this.registration.province_id.id);
      }
      if (this.registration.region_id) {
        this.loadRegions();
      }
    }
  }


  submitForm() {
    const personalData = {
        id: this.registration.id,
        name: this.registration.name,
        lastname: this.registration.lastname,
        birthdate: this.registration.birthdate,
        email: this.registration.email,
        phone_number: this.registration.phone_number,
        citizenship: this.registration.citizenship,
        province_id: this.registration.province_id ? this.registration.province_id : null,
        canton_id: this.registration.canton_id ? this.registration.canton_id : null,
        region_id: this.registration.region_id ? this.registration.region_id : null,
    };
    this.formService.createAthlete(personalData).subscribe(response => {
        console.log('Formulario enviado correctamente:', personalData);
        this.nextStep();
    }, error => {
        console.error('Error al enviar el formulario:', error);
    });
}

onConfirmation(confirmed: boolean) {
  this.showConfirmation = false;

  if (!confirmed) {
    console.log('Name confirmed');
  } else {
    this.registration.name = '';
    this.registration.lastname = '';

  }
}

  onFormValidationConfirmation(confirmed: boolean) {
    this.showFormValidationDialog = false;
    if (confirmed) {
      this.submitForm();
    }
  }
}





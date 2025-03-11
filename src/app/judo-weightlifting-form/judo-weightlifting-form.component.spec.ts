import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JudoWeightliftingFormComponent } from './judo-weightlifting-form.component';

describe('JudoWeightliftingFormComponent', () => {
  let component: JudoWeightliftingFormComponent;
  let fixture: ComponentFixture<JudoWeightliftingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudoWeightliftingFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JudoWeightliftingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark error for invalid weight', () => {
    component.onWeightChange('-5');
    expect(component.weightError).toBeTrue();
  });

  it('should accept valid weight', () => {
    component.onWeightChange('70');
    expect(component.weightError).toBeFalse();
    expect(component.weightData.bodyWeight).toBe(70);
  });

  it('should not submit with invalid weight', () => {
    spyOn(console, 'log');
    component.weightData.bodyWeight = '';
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Por favor ingrese un peso válido en kg.');
  });

  it('should submit with valid weight', () => {
    spyOn(console, 'log');
    component.weightData.bodyWeight = 80;
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Formulario enviado correctamente', component.weightData);
  });
});

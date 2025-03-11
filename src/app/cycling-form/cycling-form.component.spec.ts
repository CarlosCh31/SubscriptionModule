import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclingFormComponent } from './cycling-form.component';

describe('CyclingFormComponent', () => {
  let component: CyclingFormComponent;
  let fixture: ComponentFixture<CyclingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyclingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyclingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

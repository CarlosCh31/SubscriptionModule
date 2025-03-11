import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquestrianFormComponent } from './equestrian-form.component';

describe('EquestrianFormComponent', () => {
  let component: EquestrianFormComponent;
  let fixture: ComponentFixture<EquestrianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquestrianFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquestrianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

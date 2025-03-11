import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmingFormComponent } from './swimming-form.component';

describe('SwimmingFormComponent', () => {
  let component: SwimmingFormComponent;
  let fixture: ComponentFixture<SwimmingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwimmingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwimmingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

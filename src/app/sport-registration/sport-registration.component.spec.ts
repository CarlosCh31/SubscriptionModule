import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportRegistrationComponent } from './sport-registration.component';

describe('SportRegistrationComponent', () => {
  let component: SportRegistrationComponent;
  let fixture: ComponentFixture<SportRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

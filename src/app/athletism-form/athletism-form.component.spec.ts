import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletismFormComponent } from './athletism-form.component';

describe('AthletismFormComponent', () => {
  let component: AthletismFormComponent;
  let fixture: ComponentFixture<AthletismFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletismFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletismFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

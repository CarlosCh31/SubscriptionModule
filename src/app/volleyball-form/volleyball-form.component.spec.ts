import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballFormComponent } from './volleyball-form.component';

describe('VolleyballFormComponent', () => {
  let component: VolleyballFormComponent;
  let fixture: ComponentFixture<VolleyballFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolleyballFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VolleyballFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

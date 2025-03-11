import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KayakFormComponent } from './kayak-form.component';

describe('KayakFormComponent', () => {
  let component: KayakFormComponent;
  let fixture: ComponentFixture<KayakFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KayakFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KayakFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

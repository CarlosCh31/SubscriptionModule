import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RhythmicgymnasticsFormComponent } from './rhythmicgymnastics-form.component';

describe('RhythmicgymnasticsFormComponent', () => {
  let component: RhythmicgymnasticsFormComponent;
  let fixture: ComponentFixture<RhythmicgymnasticsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhythmicgymnasticsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhythmicgymnasticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

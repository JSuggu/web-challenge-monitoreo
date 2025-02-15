import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorUpdateFormComponent } from './sensor-update-form.component';

describe('SensorUpdateFormComponent', () => {
  let component: SensorUpdateFormComponent;
  let fixture: ComponentFixture<SensorUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

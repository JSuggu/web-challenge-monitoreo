import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantFormCardComponent } from './plant-form-card.component';

describe('PlantFormCardComponent', () => {
  let component: PlantFormCardComponent;
  let fixture: ComponentFixture<PlantFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantFormCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

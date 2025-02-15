import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantUpdateFormComponent } from './plant-update-form.component';

describe('PlantUpdateFormComponent', () => {
  let component: PlantUpdateFormComponent;
  let fixture: ComponentFixture<PlantUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

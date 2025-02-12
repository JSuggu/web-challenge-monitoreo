import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringLayoutComponent } from './monitoring-layout.component';

describe('MonitoringLayoutComponent', () => {
  let component: MonitoringLayoutComponent;
  let fixture: ComponentFixture<MonitoringLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

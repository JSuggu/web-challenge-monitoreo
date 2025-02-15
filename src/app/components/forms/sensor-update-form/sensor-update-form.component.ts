import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Sensor } from '../../../models/Sensor';
import { AlertCardComponent } from '../../cards/alert-card/alert-card.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RequestService } from '../../../services/request/request.service';
import { UpdateSensor } from '../../../models/request.interface';

@Component({
  selector: 'app-sensor-update-form',
  imports: [AlertCardComponent, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './sensor-update-form.component.html',
  styleUrl: './sensor-update-form.component.css'
})
export class SensorUpdateFormComponent {
  @Input() plantUuid!: string;
  @Input() selectedSensor!: Sensor;
  @Output() closeForm = new EventEmitter<void>;
  sensorForm!: FormGroup;
  requestService = inject(RequestService);
  alertMessage!: string;
  showAlert: boolean = false;
  @Output() updatedSensor = new EventEmitter<Sensor>();

  constructor() {}

  ngOnInit(){
    this.sensorForm = new FormGroup({
      readings: new FormControl(this.selectedSensor.readings, [Validators.required, Validators.min(1), Validators.max(10000)]),
      averageAlerts: new FormControl(this.selectedSensor.averageAlerts, [Validators.required, Validators.min(1), Validators.max(10000)]),
      redAlerts: new FormControl(this.selectedSensor.redAlerts, [Validators.required, Validators.min(1), Validators.max(10000)]),
      enabled: new FormControl(this.selectedSensor.enabled, Validators.required)
    });
  }

  onSubmit(){
    const token = localStorage.getItem("token");
    const {readings, averageAlerts, redAlerts, enabled} = this.sensorForm.value;
    const udaptedSensor: UpdateSensor = {
      plantUuid: this.plantUuid,
      readings,
      averageAlerts,
      redAlerts,
      enabled
    }

    this.requestService.updateSensor(token, udaptedSensor, this.selectedSensor.id).subscribe(response => {
        this.alertMessage = "Sensor actualizado"
        this.showAlert = true;
        this.updatedSensor.emit(response);
    }, error => {
      console.log(JSON.stringify(error));
    })
  }

  close(){
    this.closeForm.emit();
  }

  OnCloseAlert(){
    this.showAlert = false;
    this.closeForm.emit();
  }

  get readings(){
    return this.sensorForm.get('readings');
  }

  get averageAlerts(){
    return this.sensorForm.get('averageAlerts');
  }

  get redAlerts(){
    return this.sensorForm.get('redAlerts');
  }

  get enabled(){
    return this.sensorForm.get('enabled');
  }
}

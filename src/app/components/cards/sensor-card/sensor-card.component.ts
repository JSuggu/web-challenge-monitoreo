import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Sensor, SensorType } from '../../../models/Sensor';
import { NgIf } from '@angular/common';
import { SensorUpdateFormComponent } from "../../forms/sensor-update-form/sensor-update-form.component";
import { OperationsService } from '../../../services/operations/operations.service';

@Component({
  selector: 'app-sensor-card',
  imports: [NgIf, SensorUpdateFormComponent],
  templateUrl: './sensor-card.component.html',
  styleUrl: './sensor-card.component.css'
})
export class SensorCardComponent {
  @Input()plantUuid!: string;
  @Input()sensor!: Sensor;
  operationsService = inject(OperationsService);
  image!: string | undefined;
  showForm: boolean = false;
  @Output()updatedSensorCard = new EventEmitter<Sensor>();
  
  constructor(){}

  ngAfterContentInit(){
    this.image = this.operationsService.sensorsImages.get(this.sensor.sensorType.name);
  }

  updateSensor(){
    this.showForm = true;
  }

  onCloseForm(){
    this.showForm = false;
  }

  getUpdatedSensor(updatedSensorReceived: Sensor){
    this.updatedSensorCard.emit(updatedSensorReceived);
  }
}
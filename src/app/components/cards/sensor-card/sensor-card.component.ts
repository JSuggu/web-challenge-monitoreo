import { Component, Input } from '@angular/core';
import { Sensor, SensorType } from '../../../models/Sensor';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor-card',
  imports: [NgIf],
  templateUrl: './sensor-card.component.html',
  styleUrl: './sensor-card.component.css'
})
export class SensorCardComponent {
  @Input()sensor!: Sensor;
  @Input()image!: string;

}
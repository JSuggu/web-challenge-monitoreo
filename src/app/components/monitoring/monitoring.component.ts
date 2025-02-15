import { afterRender, Component, inject } from '@angular/core';
import { Plant } from '../../models/Plant';
import { CommonModule } from '@angular/common';
import { TotalCardComponent } from "../cards/total-card/total-card.component";
import { Sensor, SensorType } from '../../models/Sensor';
import { OperationsService } from '../../services/operations/operations.service';
import { SensorCardComponent } from "../cards/sensor-card/sensor-card.component";
import { RequestService } from '../../services/request/request.service';
import { DataGlobalCard, TotalSumPlant } from '../../models/monitoring.interface';
import { PlantFormCardComponent } from '../forms/plant-save-form/plant-save-form.component';
import { PlantUpdateFormComponent } from "../forms/plant-update-form/plant-update-form.component";

@Component({
  selector: 'app-monitoring',
  imports: [CommonModule, TotalCardComponent, TotalCardComponent, SensorCardComponent, PlantFormCardComponent, PlantUpdateFormComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent {
  requestService = inject(RequestService);
  operationsService = inject(OperationsService);
  plants!: Array<Plant>;
  totalSumPlants!: Array<TotalSumPlant>;
  globalData: Array<DataGlobalCard> = new Array();
  selectedRow: number | null = null;
  selectedPlant: Plant | null = null;
  sensorsImage!: Array<string>;
  isToPostPlant: boolean = false;
  isToUpdatePlant: boolean = false;
  extraOptionPlant: boolean = false;

  constructor(){
    afterRender(() => {
      let token = localStorage.getItem("token");
      this.requestService.getPlants(token).subscribe( data => {
        this.plants = data;
        const {totalAllPlants, totalByPlants} = this.operationsService.getSumTotalData(data);
        this.totalSumPlants = totalByPlants;
        this.globalData = this.operationsService.loadImagesForGlobalData(totalAllPlants);
      },
      error => {
        console.log(error);
      })})
  }

  ngOnInit(){
    this.sensorsImage = this.operationsService.loadImagesForSensors();
  }

  selectRow(index: number) {
    if(this.selectedRow === index){
      this.extraOptionPlant = false;
      this.selectedRow = null;
      this.selectedPlant = null;
    } else {
      this.extraOptionPlant = true;
      this.selectedRow = index;
      this.selectedPlant = this.plants[index];
    }
  }

  addPlant(){
    this.isToPostPlant = this.isToPostPlant == false? true : false;
  }

  editPlant(){
    this.isToUpdatePlant = this.isToUpdatePlant == false? true : false;
  } 

  onCloseForm(){
    this.isToPostPlant = false;
    this.isToUpdatePlant = false;
  }
}

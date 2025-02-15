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
import { AlertCardComponent } from "../cards/alert-card/alert-card.component";

@Component({
  selector: 'app-monitoring',
  imports: [CommonModule, TotalCardComponent, TotalCardComponent, SensorCardComponent, PlantFormCardComponent, PlantUpdateFormComponent, AlertCardComponent],
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
  alertMessage: string | null = null;

  constructor(){
    afterRender(() => {
      let token = localStorage.getItem("token");
      this.requestService.getPlants(token).subscribe( response => {
        this.plants = response;
        const {totalAllPlants, totalByPlants} = this.operationsService.getSumTotalData(response);
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

  deletePlant(plant: Plant){
    if (window.confirm('¿Estás seguro de que quieres la planta?')){
      const token = localStorage.getItem("token") || '';
      this.requestService.deletePlant(token, plant.uuid).subscribe(response => {
        this.alertMessage = response.message;
      });
    }
  }

  onCloseAlert(){
    this.alertMessage = null;
  }

  onCloseForm(){
    this.isToPostPlant = false;
    this.isToUpdatePlant = false;
  }
}

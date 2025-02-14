import { afterRender, Component, inject } from '@angular/core';
import { Plant } from '../../models/Plant';
import { CommonModule } from '@angular/common';
import { TotalCardComponent } from "../cards/total-card/total-card.component";
import { Sensor, SensorType } from '../../models/Sensor';
import { OperationsService } from '../../services/operations/operations.service';
import { SensorCardComponent } from "../cards/sensor-card/sensor-card.component";
import { RequestService } from '../../services/request/request.service';
import { DataGlobalCard, TotalSumPlant } from '../../models/monitoring.interface';

@Component({
  selector: 'app-monitoring',
  imports: [CommonModule, TotalCardComponent, TotalCardComponent, SensorCardComponent],
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
      this.selectedRow = null;
      this.selectedPlant = null;
    } else {
      this.selectedRow = index;
      this.selectedPlant = this.plants[index];
      console.log(this.selectedPlant);
    }
  }

}

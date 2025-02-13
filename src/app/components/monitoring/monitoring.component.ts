import { Component, inject } from '@angular/core';
import { Plant } from '../../models/Plant';
import { CommonModule } from '@angular/common';
import { TotalCardComponent } from "../cards/total-card/total-card.component";
import { Sensor, SensorType } from '../../models/Sensor';
import { OperationsService } from '../../services/operations/operations.service';
import { SensorCardComponent } from "../cards/sensor-card/sensor-card.component";

@Component({
  selector: 'app-monitoring',
  imports: [CommonModule, TotalCardComponent, TotalCardComponent, SensorCardComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent {
  plants!: Array<Plant>;
  selectedPlant: Plant | null = null;
  totalData: Array<TotalData> = new Array();
  operationsService = inject(OperationsService);
  readings = 0;
  averageAlerts = 0;
  redAlerts = 0;
  selectedRow: number | null = null;
  sensorsImage = new Array(
    "assets/images/sensor/temperature.svg", "assets/images/sensor/presion.svg", "assets/images/sensor/wind.svg", "assets/images/sensor/levels.svg",
    "assets/images/sensor/energy.svg", "assets/images/sensor/tension.svg", "assets/images/sensor/co2.svg", "assets/images/sensor/other.svg"
  );

  constructor(){}

  ngOnInit(){
    this.addPlantTest();

    this.totalData.push({key: "readings", title: "Lecturas ok", value: 0, img: "assets/images/alerts/ok.svg"});
    this.totalData.push({key: "averageAlerts", title: "Alertas medias", value: 0, img: "assets/images/alerts/alert.svg"});
    this.totalData.push({key: "redAlerts", title: "Alertas rojas", value: 0, img: "assets/images/alerts/danger.svg"});
    this.totalData.push({key: "disabled", title: "Sensores desabilitados", value: 0, img: "assets/images/alerts/disabled.svg"});
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

  ngOnChange(){
    this.selectRow;
  }

  addPlantTest(){
    const sensors: Sensor[] = [
      { id: 1, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 1, name: "Temperatura" }, enabled: true },
      { id: 2, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 2, name: "Presion" }, enabled: true },
      { id: 3, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 3, name: "Viento" }, enabled: true },
      { id: 4, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 4, name: "Niveles" }, enabled: true },
      { id: 5, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 5, name: "Energia" }, enabled: true },
      { id: 6, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 6, name: "Tension" }, enabled: true },
      { id: 7, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 7, name: "Monoxido de Carbono" }, enabled: true },
      { id: 8, readings: 0, averageAlerts: 0, redAlerts: 0, type: { id: 8, name: "Otros gases" }, enabled: true }
    ];

    this.plants = [
      {
        uuid: "1a2b3c4d",
        name: "Greenhouse Alpha",
        country: "USA",
        sensorsList: sensors
      },
      {
        uuid: "2b3c4d5e",
        name: "Solar Farm Beta",
        country: "Germany",
        sensorsList: sensors
      },
      {
        uuid: "3c4d5e6f",
        name: "Hydro Station Gamma",
        country: "Canada",
        sensorsList: sensors
      },
      {
        uuid: "4d5e6f7g",
        name: "Wind Farm Delta",
        country: "Spain",
        sensorsList: sensors
      },
      {
        uuid: "5e6f7g8h",
        name: "Bio Lab Epsilon",
        country: "Brazil",
        sensorsList: sensors
      }
    ];
  }
}

interface TotalData{
  key: string,
  value: number,
  title: string,
  img: string
}

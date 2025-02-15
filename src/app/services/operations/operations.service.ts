import { Injectable } from '@angular/core';
import { Plant } from '../../models/Plant';
import { SumTotalData, DataGlobalCard, TotalSumAllPlant, TotalSumPlant } from '../../models/monitoring.interface';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  sensorsImages: Map<string, string> = new Map();

  constructor() {
    this.sensorsImages.set("temperatura", "assets/images/sensor/temperature.svg");
    this.sensorsImages.set("presion", "assets/images/sensor/presion.svg");
    this.sensorsImages.set("viento", "assets/images/sensor/wind.svg");
    this.sensorsImages.set("niveles", "assets/images/sensor/levels.svg");
    this.sensorsImages.set("energia", "assets/images/sensor/energy.svg");
    this.sensorsImages.set("tension", "assets/images/sensor/tension.svg");
    this.sensorsImages.set("monoxido de carbono", "assets/images/sensor/co2.svg");
    this.sensorsImages.set("otros gases", "assets/images/sensor/other.svg");
  }

  getSumTotalData(allPlants: Array<Plant>): SumTotalData{
    const listTotalSumByPlant: Array<TotalSumPlant> = new Array();
    let totalSum: TotalSumPlant;
    let totalReadings = 0, totalAverageAlerts = 0, totalRedAlerts = 0, sensorsDisabled = 0;
    let readings = 0, averages = 0, reds = 0;

    allPlants.forEach(plant => {
      plant.sensors.forEach(sensor => {
        readings += sensor.readings;
        averages += sensor.averageAlerts;
        reds += sensor.redAlerts;

        totalReadings += sensor.readings;
        totalAverageAlerts += sensor.averageAlerts;
        totalRedAlerts += sensor.redAlerts;
        if(!sensor.enabled) sensorsDisabled++;
      });

      totalSum = {totalReadings: readings, totalAverageAlerts: averages, totalRedAlerts: reds};
      listTotalSumByPlant.push(totalSum);

      readings = 0; 
      averages = 0; 
      reds = 0;
    });

    const totalSumAllPlants = {totalReadings, totalAverageAlerts, totalRedAlerts, sensorsDisabled};

    return {totalAllPlants: totalSumAllPlants, totalByPlants: listTotalSumByPlant};
  }

  loadImagesForGlobalData(totalAllPlants : TotalSumAllPlant): Array<DataGlobalCard>{
    const total: Array<DataGlobalCard> = new Array();
    const {totalReadings, totalAverageAlerts, totalRedAlerts, sensorsDisabled} = totalAllPlants;
    
    total.push({key: "readings", title: "Lecturas ok", value: totalReadings, img: "assets/images/alerts/ok.svg"});
    total.push({key: "averageAlerts", title: "Alertas medias", value: totalAverageAlerts, img: "assets/images/alerts/alert.svg"});
    total.push({key: "redAlerts", title: "Alertas rojas", value: totalRedAlerts, img: "assets/images/alerts/danger.svg"});
    total.push({key: "disabled", title: "Sensores desabilitados", value: sensorsDisabled, img: "assets/images/alerts/disabled.svg"});

    return total;
  }

  loadImageForSensors(sensorTypeName:string): string | undefined{
    return this.sensorsImages.get(sensorTypeName);
  }
}

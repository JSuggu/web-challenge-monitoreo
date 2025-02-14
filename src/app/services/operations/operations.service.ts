import { Injectable } from '@angular/core';
import { Plant } from '../../models/Plant';
import { SumTotalData, DataGlobalCard, TotalSumAllPlant, TotalSumPlant } from '../../models/monitoring.interface';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  constructor() {}

  getSumTotalData(allPlants: Array<Plant>): SumTotalData{
    const listTotalSumByPlant: Array<TotalSumPlant> = new Array();
    let totalSum: TotalSumPlant;
    let totalReadings = 0, totalAverageAlerts = 0, totalRedAlerts = 0, sensorsDisabled = 0;
    let readings = 0, averages = 0, reds = 0;

    allPlants.forEach(plant => {
      plant.sensors.forEach(sensor => {
        readings += sensor.reading;
        averages += sensor.averageAlerts;
        reds += sensor.redAlerts;

        totalReadings += sensor.reading;
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

  loadImagesForSensors(): Array<string>{
    const sensorsImages = new Array(
      "assets/images/sensor/temperature.svg", "assets/images/sensor/presion.svg", "assets/images/sensor/wind.svg", "assets/images/sensor/levels.svg",
      "assets/images/sensor/energy.svg", "assets/images/sensor/tension.svg", "assets/images/sensor/co2.svg", "assets/images/sensor/other.svg"
    );
    return sensorsImages;
  }
}

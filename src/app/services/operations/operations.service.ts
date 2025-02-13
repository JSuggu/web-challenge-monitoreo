import { Injectable } from '@angular/core';
import { Plant } from '../../models/Plant';
import { TotalSumAllPlant, TotalSumPlant } from '../../models/monitoring.interface';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  constructor() {}

  getTotalOfAllPlants(allPlants: Array<Plant>){
    let totalSum: TotalSumAllPlant;

    
  }

  getTotalByPlant(plant: Plant){
    let totalSum: TotalSumPlant;

  }
}

export interface SumTotalData {
    totalAllPlants: TotalSumAllPlant;
    totalByPlants: Array<TotalSumPlant>
}

export interface TotalSumAllPlant {
    totalReadings: number,
    totalAverageAlerts: number,
    totalRedAlerts: number,
    sensorsDisabled: number
}

export interface TotalSumPlant {
    totalReadings: number,
    totalAverageAlerts: number,
    totalRedAlerts: number
}

export interface DataGlobalCard{
    key: string,
    value: number,
    title: string,
    img: string
}
export interface CreatePlant{
    name: string;
    country: string;
}

export interface UpdateSensor{
    plantUuid: string,
    readings: number,
    averageAlerts: number,
    redAlerts: number,
    enabled: boolean
}
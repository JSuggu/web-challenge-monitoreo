export interface Sensor {
    id: number,
    readings: number,
    averageAlerts: number,
    redAlerts: number,
    enabled: boolean,
    sensorType: SensorType
}

export interface SensorType {
    id: number,
    name: string
}
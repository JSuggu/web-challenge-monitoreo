export interface Sensor {
    id: number,
    reading: number,
    averageAlerts: number,
    redAlerts: number,
    enabled: boolean,
    sensorType: SensorType
}

export interface SensorType {
    id: number,
    name: string
}
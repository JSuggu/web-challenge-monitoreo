import { Sensor } from "./Sensor";

export interface Plant {
    uuid: string,
    name: string,
    country: string,
    sensorsList: Array<Sensor>
}
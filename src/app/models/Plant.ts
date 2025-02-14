import { Sensor } from "./Sensor";

export interface Plant {
    uuid: string,
    name: string,
    country: string,
    sensors: Array<Sensor>
}
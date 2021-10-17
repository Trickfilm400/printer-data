import {Printer} from "./CPrinterClass";
interface x {
    new(url: string, uid: string, sendToDataTechnologies: string[], dataSaveMode: boolean): Printer
}
export interface IPrinterConfig {
    name: string,
    url: string,
    type: x,
    dataSaveMode?: boolean,
    sendToDataTechnologies?: string[],
    interval: number
}

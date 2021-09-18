import {PrinterResult} from "./IPrinterResult";

export interface IPrinterClass {
    getData(url: string): Promise<PrinterResult>;
}

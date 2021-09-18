import {PrinterResult} from "./IPrinterResult";
import {IPrinterClass} from "./IPrinterClass";

export abstract class Printer implements IPrinterClass {
    abstract getData(url: string): Promise<PrinterResult>;
}

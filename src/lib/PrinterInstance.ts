import {Printer} from "../interfaces/CPrinterClass";
import {PrinterResult} from "../interfaces/IPrinterResult";

class PrinterInstance {
    private readonly name: string;
    private readonly url: string;
    private readonly printerType: Printer;
    public readonly sendToDataTechnologies: string[];
    private lastPrinterResult: PrinterResult | null;

    constructor(name: string, url: string, printerType: Printer, sendToDataTechnologies: string[]) {
        this.name = name;
        this.url = url;
        this.printerType = printerType;
        this.sendToDataTechnologies = sendToDataTechnologies;
        this.lastPrinterResult = null;
    }

    async getData() {
        try {
            const data = await this.printerType.getData(this.url);
            this.lastPrinterResult = data;
            return data;
        } catch (e) {
            console.log(e);
            this.lastPrinterResult = null;
            return null;
        }
    }

}


export default PrinterInstance;

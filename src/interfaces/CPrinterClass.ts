import {PrinterResult} from "./IPrinterResult";
import {IPrinterClass} from "./IPrinterClass";

export abstract class Printer implements IPrinterClass {
    private readonly url: string;
    private readonly uid: string;
    private readonly sendToDataTechnologies: string[];
    private lastPrinterResult: PrinterResult | null;

    public getUrl() {
        return this.uid;
    }

    public getUid() {
        return this.uid;
    }

    public getSendToDataTechnologies() {
        return this.sendToDataTechnologies;
    }

    constructor(url: string, uid: string, sendToDataTechnologies: string[]) {
        this.url = url;
        this.uid = uid;
        this.sendToDataTechnologies = sendToDataTechnologies;
        this.lastPrinterResult = null;
    }

    abstract getData(): Promise<PrinterResult>;

    async getType(): Promise<PrinterType> {
        let data = await this.getData();
        return (data.cyan == -1 && data.magenta == -1 && data.yellow == -1) ? PrinterType.BLACKWHITE : PrinterType.COLOR;
    }
}

export enum PrinterType {
    COLOR,
    BLACKWHITE,
}

import {PrinterResult} from "./IPrinterResult";

export abstract class Printer {
    private readonly url: string;
    private readonly uid: string;
    private readonly sendToDataTechnologies: string[];
    private readonly dataSaveMode: boolean;
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

    public getDataSaveMode() {
        return this.dataSaveMode;
    }
    public getLastPrinterResult() {
        return this.lastPrinterResult;
    }

    constructor(url: string, uid: string, sendToDataTechnologies: string[], dataSaveMode = false) {
        this.url = url;
        this.uid = uid;
        this.sendToDataTechnologies = sendToDataTechnologies;
        this.dataSaveMode = dataSaveMode;
        this.lastPrinterResult = null;
    }

    abstract getData(): Promise<PrinterResult>;

    async getType(): Promise<PrinterType> {
        let data = await this.getData();
        return (data.cyan == -1 && data.magenta == -1 && data.yellow == -1) ? PrinterType.BLACKWHITE : PrinterType.COLOR;
    }

    public pushData(data: PrinterResult) {

    }
}

export enum PrinterType {
    COLOR,
    BLACKWHITE,
}

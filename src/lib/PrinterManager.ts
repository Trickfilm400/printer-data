import {Printer} from "../interfaces/CPrinterClass";
import PrinterInstance from "./PrinterInstance";


class PrinterManager {
    private map: Map<string, { class: PrinterInstance, interval: NodeJS.Timer }> = new Map();


    private static isUrl(s) {
        let regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }

    addPrinter(name: string, url: string, printerType: Printer, sendToDataTechnologies: string[], intervalSeconds: number) {
        //check for invalid options
        if (this.map.has(name)) return "NAME_ALREADY_IN_USE";
        if (!PrinterManager.isUrl(url)) return "URL_NOT_VALID";
        //create object
        const x = new PrinterInstance(name, url, printerType, sendToDataTechnologies);
        //create interval
        const interval = setInterval((name) => this.handler(name), intervalSeconds, name);
        //save data
        this.map.set(name, {
            class: x,
            interval
        });
        //call handler initially
        this.handler(name);
        console.log("[%s] Added Printer " + name, process.uptime());
    }


    private async handler(name: string) {
        const obj = this.map.get(name);
        const data = await obj.class.getData();
        console.log("data", data);
        if (data) {
        }
    }

}


export default PrinterManager;

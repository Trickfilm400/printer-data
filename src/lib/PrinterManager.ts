import {Printer} from "../interfaces/CPrinterClass";


class PrinterManager {
    private map: Map<string, { class: Printer, interval: NodeJS.Timer }> = new Map();


    private static isUrl(s) {
        let regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }

    addPrinter(instance: Printer, intervalSeconds: number) {
        //check for invalid options
        if (this.map.has(instance.getUid())) return "NAME_ALREADY_IN_USE";
        if (!PrinterManager.isUrl(instance.getUrl())) return "URL_NOT_VALID";
        //create interval
        const interval = setInterval((name) => this.handler(instance.getUid()), intervalSeconds, instance.getUid());
        //save data
        this.map.set(instance.getUid(), {
            class: instance,
            interval
        });
        //call handler initially
        this.handler(instance.getUid());
        console.log("[%s] Added Printer " + instance.getUid(), process.uptime());
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

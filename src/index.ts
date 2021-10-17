import PrinterManager from "./lib/PrinterManager";
import {IPrinterConfig} from "./interfaces/IPrinterConfig";
import Mqtt from "./dataTechnologies/mqtt";
const config = require("../config.js");
console.log("[%s] Starting Process", process.uptime());

new Mqtt(config.mqtt.host,config.mqtt.port, config.mqtt.clientID, config.mqtt.username, config.mqtt.password, config.mqtt.topic);

const printerManager = new PrinterManager();

config.printers.forEach((e: IPrinterConfig) => {
    const u = printerManager.addPrinter(new e.type(e.name, e.url, e.sendToDataTechnologies || [], e.dataSaveMode), e.interval);
});

process.on("SIGINT", () => {
    console.log("\n[%s] Stopping Programm...\n\n.", process.uptime());
    process.exit(0);
});

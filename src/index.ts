import PrinterManager from "./lib/PrinterManager";
import {IPrinterConfig} from "./interfaces/IPrinterConfig";
//LOADING data Technologies
import Mqtt from "./dataTechnologies/mqtt";
import SocketIO from "./dataTechnologies/socketio";
const config = require("../config.js");
console.log("[%s] Starting Process", process.uptime());

//start data technologies
new Mqtt(config.mqtt.host,config.mqtt.port, config.mqtt.clientID, config.mqtt.username, config.mqtt.password, config.mqtt.topic);
new SocketIO(config.socketio.port, config.socketio.eventName);
//
const printerManager = new PrinterManager();

config.printers.forEach((e: IPrinterConfig) => {
    const u = printerManager.addPrinter(new e.type(e.name, e.url, e.sendToDataTechnologies || [], e.dataSaveMode), e.interval);
});

process.on("SIGINT", () => {
    console.log("\n[%s] Stopping Programm...\n\n.", process.uptime());
    process.exit(0);
});

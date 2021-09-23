import fetch from "node-fetch";
import {Printer, PrinterType} from "../interfaces/CPrinterClass";
import {PrinterResult} from "../interfaces/IPrinterResult";

export default class Canon extends Printer {
    async getData() {

        let json = {};
        return new Promise<PrinterResult>((resolve, reject) => {
            fetch(this.getUrl() + "/JS_MDL/model.js").then(res => {
                //console.log(res);
                if (res.status !== 200) throw new Error("PRINTER_UNAVAILABLE");
                return res.text();
            }).then(body => {
                //console.log(body)
                let status = (parseInt(body.split("var g_bst_st")[1].split(";")[0].split(" = ")[1].replace("'", "")));
                let status_arr = ["Bereit", "Drucker führt andere Aufgabe aus.", "Der Drucker ist in Betrieb.",
                    "Ein Fehler ist aufgetreten.", "Drucker prüfen.", "Reinigen", "Testdruck wird gerade verarb.",
                    "Wenn der Text zu lesen ist weiß ich auch nicht weiter :)", "SSL/TLS wird vorbereitet"];
                /* FETCH PRINTER FUEL*/
                let ink = (body.split("var inktank=[];")[1].split("var g_help_url")[0].replace(/\n/g, "").split((";")));
                let color = ["black", undefined, "cyan", "magenta", "yellow"];
                ink.forEach(item => {
                    if (item.startsWith("inktank")) {
                        let [colorINT, colorVAL] = JSON.parse(item.split("=")[1]);
                        json[color[colorINT]] = (100 - colorVAL * 10);
                    }
                });
                /* FETCH PRINTER STATUS*/
                json["status"] = status_arr[status]; // get printer status
                //resolve with name of printer and all data
                resolve(<PrinterResult>json);
            }).catch(error => {
                reject(error.code);
            });
        });
    }
}

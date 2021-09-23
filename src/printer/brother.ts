import {PrinterResult} from "../interfaces/IPrinterResult";
import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import {Printer} from "../interfaces/CPrinterClass";

export default class Brother extends Printer {
    async getData() {

        let json: PrinterResult = {
            black: -1,
            cyan: -1,
            yellow: -1,
            magenta: -1,
            status: null
        };
        return new Promise<PrinterResult>((resolve, reject) => {
            fetch(this.getUrl()).then(res => {
                //console.log(res);
                if (res.status !== 200) throw new Error("PRINTER_UNAVAILABLE");
                return res.text();
            }).then(body => {
                //convert text to HTML object
                let data = new JSDOM(body);

                /* FETCH PRINTER FUEL*/
                let cartridges = data.window.document.querySelectorAll("#inkLevel img.tonerremain, #ink_level img.tonerremain");
                cartridges.forEach(item => {
                    let percentage = Math.floor(item.getAttribute("height") * 1.81818182); // calculate percentage
                    percentage = percentage > 100 ? 100 : percentage < 0 ? 0 : percentage;
                    let name = item.getAttribute("alt").toLowerCase();
                    json[name] = percentage;
                });

                /* FETCH PRINTER STATUS*/
                json["status"] = (data.window.document.querySelector("#moni_data>span").innerHTML).trim(); // get printer
                // status
                json["status"] = (json["status"].replace("�", "ü"));
                //resolve with name of printer and all data
                resolve(json);
            }).catch(error => {
                reject(error.code);
            });
        });
    }
}

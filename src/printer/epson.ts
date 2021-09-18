import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import {Printer} from "../interfaces/CPrinterClass";
import {PrinterResult} from "../interfaces/IPrinterResult";

export default class Epson extends Printer {
    async getData(url: string) {

        let json: PrinterResult = {
            black: -1,
            cyan: -1,
            yellow: -1,
            magenta: -1,
            status: null
        };
        return new Promise<PrinterResult>((resolve, reject) => {
            fetch(url + "/PRESENTATION/HTML/TOP/PRTINFO.HTML").then(res => {
                //console.log(res);
                if (res.status !== 200) throw new Error("PRINTER_UNAVAILABLE");
                return res.text();
            }).then(body => {
                //convert text to HTML object
                let data = new JSDOM(body);

                /* FETCH PRINTER FUEL*/
                let cartridges = data.window.document.querySelectorAll("ul.inksection>li");
                let colors = {"Ink_K": "black", "Ink_C": "cyan", "Ink_M": "magenta", "Ink_Y": "yellow"};
                cartridges.forEach(item => {
                    let percentage = Math.floor(item.children[0].firstElementChild.height * 2); // calculate
                    // percentage
                    let name = colors[item.children[0].firstElementChild.src.split("/").splice(-1)[0].split(".")[0]];
                    json[name] = percentage;
                });

                /* FETCH PRINTER STATUS*/
                json["status"] = (data.window.document.querySelector("#PRTSCN_STATUS>ul>li>div").innerHTML).trim(); // get printer
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

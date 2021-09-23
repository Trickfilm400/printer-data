import {JSDOM} from "jsdom";
import {PrinterResult} from "../interfaces/IPrinterResult";
import fetch from "node-fetch";
import {Printer} from "../interfaces/CPrinterClass";

export default class Oki extends Printer {
    async getData() {

        let json = {};
        return new Promise<PrinterResult>((resolve, reject) => {
            fetch(this.getUrl() + "/status.htm", {
                "headers": {
                    "Method": " GET /status.htm HTTP/1.1",
                    "Connection": "keep-alive",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Referer": this.getUrl(),
                    "Accept-Encoding": "gzip, deflate; Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
                }
            }).then(res => {
                //console.log(res);
                if (res.status !== 200) throw new Error("PRINTER_UNAVAILABLE");
                return res.text();
            }).then(body => {
                //console.log(body)
                let data = new JSDOM(body);
                let toner = ["cyan", "magenta", "yellow", "black"]; //document names => ["AVAILABELCYANTONER", "AVAILABELMAGENTATONER", "AVAILABELYELLOWTONER", "AVAILABELBLACKTONER"];
                toner.forEach(item => {
                    json[item] = parseInt(data.window.document.getElementsByName("AVAILABEL" + item.toUpperCase() + "TONER")[0].value);
                });
                json["status"] = "Online"; //website does not have any status text
                //console.log(json); //debug
                resolve(<PrinterResult>json);
            }).catch(error => {
                //console.log(error)
                //console.log(error.code)
                reject(error.code);
            });
        });
    }
}

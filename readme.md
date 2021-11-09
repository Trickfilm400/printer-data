# printer-data (typescript)

**This project gets printer data via http requests and send them to a mqtt broker or via socket.io**

## Features
* set printers and every setting via config file
* request printer data from printers
* Supported printers:
    * Oki
    * Brother
    * Canon
    * Epson
* send printer data over mqtt & socket.io with name, status and ink status as json
* if printer does not respond, send offline message
* Docker Image


## Configuration
- See `config.example.js`
- Copy to `config.js`

- Printer config (array of objects like below):
```json5
{
	"name": "test", //name of printer which will be used as an identifier in socket.io & mqtt messages
	"url": "http://192.168.2.101", // url or host to printer
	"type": Oki.default, // or other printer type, see name in the imports
	"interval": 1000, //request interval in MS
	"sendToDataTechnologies": ["mqtt", "socketio"], //array of data-technologies available
	"dataSaveMode": true //only send new message via socket.io & mqtt, if printerData changed
}
```

## Usage
- Github Packages:
  - `docker run -d --rm --name printer-data --restart=always -v config.js:/app/dist/config.js ghcr.io/trickfilm400/printer-data:master`
- Docker Hub
  - `docker run -d --rm --name printer-data --restart=always -v config.js:/app/dist/config.js n404/printer-data:latest`

## Other
- Any questions, issues or feature requests? Contact me, for example, create an issue

&copy; 2021 Trickfilm400

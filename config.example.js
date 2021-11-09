const Oki = require("./dist/printer/oki.js");
const Epson = require("./dist/printer/epson.js");
const Brother = require("./dist/printer/brother.js");
const Canon = require("./dist/printer/canon.js");

module.exports = {
	mqtt: {
		host: "tcp://192.168.2.100",
		port: 1883,
		clientID: "clientID-Random-12345",
		username: "username",
		password: "SuportSecur3Passwort",
		topic: "path/to/tpoic/"
	},
	socketio: {
		port: 3000,
		eventName: "printerData"
	},
	printers: [
		{
			"name": "test",
			"url": "http://192.168.2.101",
			"type": Oki.default,
			"interval": 1000,
			"sendToDataTechnologies": ["mqtt", "socketio"],
			"dataSaveMode": true
		}
	]
}

# printer-data (typescript)

**This project gets printer data via http requests and send them to a mqtt broker**

* set printers and every setting via config file
* request printer data from printers
* Supported printers:
    * Oki
    * Brother
    * Canon
    * Epson
* send printer data over mqtt with name, status and ink status as json
* if printer does not respond, send offline message
* Docker ready

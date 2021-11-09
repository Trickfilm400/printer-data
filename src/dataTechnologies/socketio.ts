import {DataTechnology} from "../interfaces/CDataTechnology";
import {Server, Socket} from "socket.io";
import {createServer, Server as HttpServer} from "http";

export default class Socketio extends DataTechnology {
    private readonly http: HttpServer;
    private io: Server;
    private eventName: string;

    constructor(port = 3000, eventName = "printerData") {
        super("socketio");
        this.eventName = eventName;
        this.http = createServer();
        this.io = new Server(this.http, {cors: {origin: "*"}});
        this.io.on("connection", this.onConnection);
        this.http.listen(port);
    }

    onConnection(socket: Socket) {
        console.log("new connection");
    }

    public send(name: string, data: object, options?: any): boolean {
        if (name && data) {
            this.log(name, data);
            return this.io.sockets.emit(this.eventName, data);
        }
    }

}

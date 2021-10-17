import {MqttClient, connect} from 'mqtt';
import {IClientOptions} from "mqtt/types/lib/client-options";
import {DataTechnology} from "../interfaces/CDataTechnology";

export default class Mqtt extends DataTechnology {
    private readonly options: Partial<IClientOptions>;
    private client: MqttClient;
    private readonly topic: string;
    constructor(host: string, port: number, clientID: string, username: string, password: string, topic: string) {
        super("mqtt");
        this.options = {
            port: port,
            host: host,
            clientId: clientID,
            username: username,
            password: password,
            keepalive: 60,
            reconnectPeriod: 1000,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: false
        };
        this.client = connect(this.options.host, this.options);
        this.topic = topic;
    }
    public send(name: string, data: object, options: object = {retain: true}) : boolean {
        if (name && data) {
            this.log(name, data);
            this.client.publish(this.topic + name + '/json', JSON.stringify(data), options);
            for (let key in data) {
                this.client.publish(this.topic + name + '/' + key, data[key].toString(), options);
            }
        } else return false;
    }
}


export abstract class DataTechnology {
    protected readonly uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }

    log(name: string, data: object) {
        console.log(`[ ${this.uid} ] - ${name} - ${JSON.stringify(data)}`);
    }

    abstract send(name: string, data: object, options?: any): boolean;


}

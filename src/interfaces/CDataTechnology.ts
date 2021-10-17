
export const technologyMapping: Map<string, DataTechnology> = new Map;


export abstract class DataTechnology {
    protected readonly uid: string;

    protected constructor(uid: string) {
        this.uid = uid;
        technologyMapping.set(uid, this);
    }

    log(name: string, data: object) {
        console.log(`[ ${this.uid} ] - ${name} - ${JSON.stringify(data)}`);
    }

    abstract send(name: string, data: object, options?: any): boolean;


}

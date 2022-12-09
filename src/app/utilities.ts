import { HttpParams } from "@angular/common/http";

export class Utilities {

    public static appendAll(args: any): HttpParams {
        let params = new HttpParams();
        args.forEach((value: any, key: any) => {
            params = params.set(key, value);
        });
        return params;
    }

    public static locationMappingUtility(source: object, mapObject: Map<any, any>): Map<any, any> {
        const entriesDestination = Object.entries(source)
        entriesDestination.forEach(x => {
            const [key, value] = x;
            mapObject.set(key, value)
        })
        return mapObject;
    }
}
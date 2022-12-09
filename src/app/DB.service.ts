import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Utilities } from './utilities';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getLocationsData(
    context: string,
    query: string,
    fuzzy:boolean = true,
    results :number= 10,
    stops :boolean= true,
    addresses :boolean= true,
    poi: boolean= true,
    linesOfStops :boolean = false,
    language: string = 'en'): Observable<any> {

    let paramsMap = new Map<any, any>();
    paramsMap.set('query', query);
    paramsMap.set('fuzzy', fuzzy);
    paramsMap.set('results', results);
    paramsMap.set('stops', stops);
    paramsMap.set('addresses', addresses);
    paramsMap.set('poi', poi);
    paramsMap.set('linesOfStops', linesOfStops);
    paramsMap.set('language', language);

    
    const params = Utilities.appendAll(paramsMap);
    return this.httpClient.get<any>(environment.dbServicesUrl+context, {params});
  }

  getJourneysData( context: string,
    origin: object,
    destination: object,
    dateTime:string,
    results:number=5,
    stopover:boolean =false,
    transferTime:number=0,
    bike:boolean= false,
    startWithWalking:boolean= true,
    walkingSpeed:string='normal',
    tickets:boolean= false,
    polylines:boolean=false,
    remarks:boolean= true,
    scheduledDays:boolean=false,
    language:string= 'en',
    firstClass:boolean= false
    ):Observable<any>{

    let paramsMap = new Map<any, any>();
    paramsMap =Utilities.locationMappingUtility(origin,paramsMap);
    paramsMap =Utilities.locationMappingUtility(destination,paramsMap);
    paramsMap.set('departure', dateTime);
    paramsMap.set('results', results);
    paramsMap.set('stopover', stopover);
    paramsMap.set('transferTime', transferTime);
    paramsMap.set('bike', bike);
    paramsMap.set('startWithWalking', startWithWalking);
    paramsMap.set('walkingSpeed', walkingSpeed);
    paramsMap.set('tickets', tickets);
    paramsMap.set('polylines', polylines);
    paramsMap.set('remarks', remarks);
    paramsMap.set('scheduledDays', scheduledDays);
    paramsMap.set('language', language);
    paramsMap.set('firstClass', firstClass);

    const params = Utilities.appendAll(paramsMap);
    return this.httpClient.get<any>(environment.dbServicesUrl+context, {params});

  }

}

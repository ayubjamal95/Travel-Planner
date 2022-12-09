import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MtxCalendarView, MtxDatetimepickerMode, MtxDatetimepickerType } from '@ng-matero/extensions/datetimepicker';
import { DBService } from 'src/app/DB.service';
import { IAddress, IPoi, IStopStations } from 'src/app/interface';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [],
})
export class SearchComponent {


  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'auto';
  startView: MtxCalendarView = 'month';
  multiYearSelector = false;
  touchUi = false;
  twelvehour = false;
  timeInterval = 1;
  timeInput = true;
  filteredOptions: any = [];
  searchForm = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    dateTime: new FormControl('', [Validators.required])
  });
  originQuery: any;
  loading: boolean = false;

  constructor(private service: DBService,
    private router: Router) {
  }

  searchLocation(event: any): void {
    const context = "/locations";
    this.filteredOptions = [];
    if(event.target.value != null && event.target.value !="" )
    {
      this.service.getLocationsData(context, event.target.value).subscribe(x => {
        if (x != null){
          this.filteredOptions = x;
        } 
      }, (err) => {
        alert("Service Error Occurred");
      })
    }
  }
  getLocationName(option: any) {

    if (option.id != null) {
      return this.filteredOptions.find((location: any) => location.location.latitude == option.location.latitude
        && location.location.longitude == option.location.longitude).name;
    }
    else {
      return this.filteredOptions.find((location: any) => location.latitude == option.latitude
        && location.longitude == option.longitude).address;
    }

  }
  submit() {

    this.loading = true;
    const context = "/journeys";
    const { origin } = this.searchForm.value;
    const { destination } = this.searchForm.value;
    const { dateTime } = this.searchForm.value;

    let originObject: any = origin;
    let destinationObject: any = destination;
    let originDetails: any;
    let destinationDetails: any;
    originDetails = this.QueryGenerator(originObject, 'origin');
    destinationDetails = this.QueryGenerator(destinationObject, 'destination');
    if (originDetails != null && destinationDetails != null)
    {
      this.service.getJourneysData(context, originDetails, destinationDetails, dateTime as string).subscribe(x => {
        this.router.navigateByUrl('/journeys', { state: x });
        this.loading = false;
  
      }, (err) => {
        alert("Service Error Occurred");
        this.loading = false;
      })
    }
  }

  QueryGenerator(locationObject: any, source: string): any {

    if (locationObject.type == 'location' && locationObject.id == null) {

      const originQuery: Partial<IAddress> = {};
      originQuery.address = locationObject.address;
      originQuery.longitude = locationObject.longitude;
      originQuery.latitude = locationObject.latitude;
      originQuery.type = "address";
      return this.QueryFormation(originQuery, source);
    }

    else if (locationObject.type == 'stop' || locationObject.type == 'station' && locationObject.id != null) {
      const originQuery: Partial<IStopStations> = {};
      originQuery.id = locationObject.id;
      originQuery.type = "stopStation";
      return this.QueryFormation(originQuery, source);

    }
    else {
      const originQuery: Partial<IPoi> = {};
      originQuery.id = locationObject.id;
      originQuery.longitude = locationObject.longitude;
      originQuery.latitude = locationObject.latitude;
      originQuery.type = "poi";
      return this.QueryFormation(originQuery, source);
    }
  }

  QueryFormation(originDetails: any, source: string): any {
    let key: string;
    if (source == 'origin' ? key = 'from' : key = 'to')
      if (originDetails.type == 'stopStation') {
        originDetails[key] = originDetails['id'];
        delete originDetails['id'];
        delete originDetails['type'];
      }
      else if (originDetails.type == 'address') {
        originDetails[key + '.address'] = originDetails['address'];
        originDetails[key + '.longitude'] = originDetails['longitude'];
        originDetails[key + '.latitude'] = originDetails['latitude'];
        delete originDetails['address'];
        delete originDetails['longitude'];
        delete originDetails['latitude'];
        delete originDetails['type'];
      }
      else {
        originDetails[key + '.id'] = originDetails['id'];
        originDetails[key + '.longitude'] = originDetails['longitude'];
        originDetails[key + '.latitude'] = originDetails['latitude'];
        delete originDetails['id'];
        delete originDetails['longitude'];
        delete originDetails['latitude'];
        delete originDetails['type'];
      }
    return originDetails;
  }
}

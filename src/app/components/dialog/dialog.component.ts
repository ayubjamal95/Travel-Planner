import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  journey: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.journey = data;
  }
  ngOnInit(): void {
  }

  parseTime(timestamp: any): any {
    const date = new Date(timestamp);
    return date.getHours() + ':' + date.getMinutes();
  }

  close() {
    this.dialogRef.close();
  }
  getDuration(departure: string, arrival: string): string {
  const dep = new Date(departure).getTime();
  const arr = new Date(arrival).getTime();
  const minutes = Math.floor((arr - dep) / 60000);

  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
}
getValidLegs() {
  return this.journey.legs.filter(
    (    leg: { departure: string; arrival: string; }) => this.getDuration(leg.departure, leg.arrival) !== '0 min'
  );
}

}

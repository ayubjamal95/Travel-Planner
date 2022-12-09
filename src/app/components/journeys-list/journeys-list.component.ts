import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-journeys-list',
  templateUrl: './journeys-list.component.html',
  styleUrls: ['./journeys-list.component.scss']
})
export class JourneysListComponent implements OnInit {
  journeylegsLength: any;
  legs: any = []

  constructor(private router: Router,
    private dialog: MatDialog) { }
  journeysObject: any;

  ngOnInit(): void {
    this.journeysObject = history.state;
  }

  parseTime(timestamp: any): any {
    const date = new Date(timestamp);
    return date.getHours() + ':' + date.getMinutes();
  }
  getLength(journey: any): number {
    return journey.legs.length - 1
  }
  openDialog(journey: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    dialogConfig.data = journey;
    this.dialog.open(DialogComponent, dialogConfig);
  }
}

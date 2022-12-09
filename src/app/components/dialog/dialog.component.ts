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
}

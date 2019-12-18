import { Injectable } from '@angular/core';
import { ILeaves, IStats } from './Interface/stats.interface';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialog } from '../../node_modules/@angular/material';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private dialog: MatDialog) { }

  sendLeaveData(leavesData: ILeaves) {
    console.log("Leaves Data", leavesData);
    this.dialog.open(DialogBoxComponent, {
      data: {
        Message: "Data loaded onto Database Successfully"
      },
      panelClass: 'modalClass'
    });
  }

  sendStatsData (stats: IStats) {
    console.log("Stats Data: ", stats);
    this.dialog.open(DialogBoxComponent, {
      data: {
        Message: "Data loaded onto Database Successfully"
      },
      panelClass: 'modalClass'
    });
  }
}

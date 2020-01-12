import { Injectable } from '@angular/core';
import { ILeaves, IStats } from '../Interface/stats.interface';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  sendLeaveData(leavesData: ILeaves) {
    console.log("Leaves Data", leavesData);
    const url = 'http://localhost:8000/leaveDetails/';
    return this._http.post(url, leavesData);
  }
  deleteLeaveData(leavesData: ILeaves) {
    console.log("Delete Leaves Data", leavesData);
    const url = 'http://localhost:8000/leaveDetails/' + leavesData[0]['_id'];
    return this._http.delete(url);
  }
  sendStatsData(stats: IStats) {
    console.log("Stats Data: ", stats);
    const url = 'http://localhost:8000/taskDetails/';
    return this._http.post(url, stats);
  }

  updateStatsData(stats: IStats) {
    console.log("Stats Data: ", stats);
    const url = 'http://localhost:8000/taskDetails/' + stats['_id'];
    return this._http.patch(url, stats);
  }
}

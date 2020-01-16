import { Injectable } from '@angular/core';
import { ILeaves, IStats } from '../Interface/stats.interface';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
import { HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private _http: HttpClient) { }

  sendLeaveData(leavesData: ILeaves) {
    console.log("Leaves Data", leavesData);
    // const url = 'http://localhost:8000/leaveDetails/';
    const url = environment.url + 'leaveDetails/';
    return this._http.post(url, leavesData);
  }
  deleteLeaveData(leavesData: ILeaves) {
    const paramsObj = {};
    for (let i = 0; i < leavesData.length; i++) {
      paramsObj['id' + i] = leavesData[i]['_id'];
    }
    console.log("Delete Leaves Data", paramsObj);
    const params = new HttpParams({ fromObject: paramsObj });

    // const url = 'http://localhost:8000/leaveDetails/';
    const url = environment.url + 'leaveDetails/';

    return this._http.delete(url, { params });
  }
  sendStatsData(stats: IStats) {
    console.log("Stats Data: ", stats);
    // const url = 'http://localhost:8000/taskDetails/';
    const url = environment.url + 'taskDetails/';
    return this._http.post(url, stats);
  }

  updateStatsData(stats: IStats) {
    console.log("Stats Data: ", stats);
    // const url = 'http://localhost:8000/taskDetails/' + stats['_id'];
    const url = environment.url + 'taskDetails/' + stats['_id'];

    return this._http.patch(url, stats);
  }
}

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StatsService } from '../../services/stats.service';
import { ILeaves } from '../../Interface/stats.interface';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AgGridAngular } from '../../../../node_modules/ag-grid-angular';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.scss']
})
export class LeavedetailsComponent implements OnInit {
  @ViewChild('firstfield', { static: false }) firstfield: ElementRef;
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private _statsService: StatsService, private _http: HttpClient) { }
  leaveForm: FormGroup;

  columnDefs = [
    { headerName: 'Leave date', field: 'leaveDate', sortable: true, filter: true, checkboxSelection: true, width: 250 },
    { headerName: 'Leave ID / Comp Off date', field: 'compOff', sortable: true, filter: true, resizable: true, width: 260 }
  ];

  domLayout = "autoHeight";

  rowData: any;
  disableButtons: any = 0;
  deleteData: boolean = false;

  ngAfterViewInit() {
    console.log('firstfield', this.firstfield);
  }
  ngOnInit() {
    this.leaveForm = this.fb.group({
      leaves: this.fb.array([
        this.fb.group({
          _id: [''],
          leaveDate: ['', Validators.required],
          compOff: ['', Validators.required]
        })])
    });
    this.loadTable();
  }
  loadTable() {
    // const url = 'http://localhost:8000/leaveDetails/';
    const url = environment.url + 'leaveDetails/';

    this._http.get(url).subscribe(
      data => {
        console.log('get leaves data', data);
        this.rowData = data['Leaves'];
      },
      error => {
        console.log('get leaves data error', error);
      }
    )
  }
  onSelectionChanged(event: any) {
    var selectedRows = this.agGrid.api.getSelectedRows();
    this.disableButtons = selectedRows.length === 0;
    console.log(selectedRows.length);
    this.deleteData = selectedRows.length ? true : false;
  }
  deleteLeaves() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);

    this._statsService.deleteLeaveData(selectedData).subscribe(
      data => {
        console.log("from node.js ", data);
        this.openDialog(data);
        this.loadTable();
        this.deleteData = this.deleteData ? false : true;
      },
      error => {
        console.log("error from node.js ", error);
        this.openDialog(error);
      }
    )
  }
  addDates() {
    const leaves = this.leaveForm.get('leaves') as FormArray;
    leaves.push(this.fb.group({
      leaveDate: ['', Validators.required],
      compOff: ['', Validators.required]
    }));
  }

  deleteDates(index: number) {
    const leaves = this.leaveForm.get('leaves') as FormArray;
    leaves.removeAt(index);
  }

  submitLeaves() {
    const leavesData: ILeaves = this.leaveForm.controls.leaves.value;
    this._statsService.sendLeaveData(leavesData).subscribe(
      data => {
        console.log("from node.js ", data);
        this.openDialog(data);
        this.loadTable();
      },
      error => {
        console.log("error from node.js ", error);
        this.openDialog(error);
      }
    )
  }
  openDialog(data: any) {
    this.dialog.open(DialogBoxComponent, {
      data: data,
      panelClass: 'modalClass'
    });
  }
}

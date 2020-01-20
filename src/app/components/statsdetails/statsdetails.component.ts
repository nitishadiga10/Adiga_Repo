import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StatsService } from '../../services/stats.service';
import { IStats } from '../../Interface/stats.interface';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AgGridAngular } from '../../../../node_modules/ag-grid-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-statsdetails',
  templateUrl: './statsdetails.component.html',
  styleUrls: ['./statsdetails.component.scss']
})
export class StatsdetailsComponent implements OnInit {
  @Input('field1') field1: string;
  @Input('id') id: string;
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private _statsService: StatsService, private _http: HttpClient) { }
  statsForm: FormGroup;

  columnDefs = [
    { headerName: 'Ref Number', field: 'refNumber', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Req Summary', field: 'reqSummary', sortable: true, filter: true },
    { headerName: 'Req State', field: 'reqstate', sortable: true, filter: true },
    { headerName: 'Assigned To', field: 'assignedTo', sortable: true, filter: true },
    { headerName: 'Application', field: 'application', sortable: true, filter: true },
    { headerName: 'Ticket Type', field: 'ticketType', sortable: true, filter: true },
    { headerName: 'Create Date', field: 'createDate', sortable: true, filter: true },
    { headerName: 'Close Date', field: 'closeDate', sortable: true, filter: true },
    { headerName: 'Req By', field: 'reqBy', sortable: true, filter: true },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true },
    { headerName: 'Purpose', field: 'purpose', sortable: true, filter: true },
    { headerName: 'Comments', field: 'comments', sortable: true, filter: true },
    { headerName: 'Efforts', field: 'efforts', sortable: true, filter: true }
  ];

  domLayout = "autoHeight";

  rowData: any;
  disableButtons: any = 0;
  updateData: boolean = false;

  State: any = ["Complete", "On Hold", "In Progress"];
  Name: any = ["Nitish", "Anusha", "Nayana"];
  Application: any = ["Proj 1", "Proj 2", "Proj 3"];
  Ticket: any = ["Bug", "Enhancement", "New"];
  Priority: any = ["High", "Medium", "Low"];

  ngOnInit() {
    this.statsForm = this.fb.group({
      _id: [''],
      refNumber: ['', [Validators.required, Validators.pattern('^[a-zA-z{0-9}]+$')]],
      reqSummary: ['', Validators.required],
      reqstate: ['', Validators.required],
      assignedTo: ['', Validators.required],
      application: ['', Validators.required],
      ticketType: ['', Validators.required],
      createDate: ['', Validators.required],
      closeDate: ['', Validators.required],
      reqBy: ['', [Validators.required, Validators.pattern('^[a-zA-z]+$')]],
      priority: ['', Validators.required],
      efforts: ['', Validators.required],
      comments: ['', Validators.required],
      purpose: ['', Validators.required]
    });
    this.loadTable();

  }
  loadTable() {
    // const url = 'http://localhost:8000/taskDetails/';
    const url = environment.url + 'taskDetails/';

    this._http.get(url).subscribe(
      data => {
        console.log('get data', data);
        this.rowData = data['tasks'];
      },
      error => {
        console.log('get data error', error);
      }
    )
  }
  onSelectionChanged(event: any) {
    var selectedRows = this.agGrid.api.getSelectedRows();
    this.disableButtons = selectedRows.length === 0;
    this.updateData = false;
    this.resetForm();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);

    this.statsForm.patchValue({
      _id: selectedData[0]['_id'],
      refNumber: selectedData[0]['refNumber'],
      reqSummary: selectedData[0]['reqSummary'],
      reqstate: selectedData[0]['reqstate'],
      assignedTo: selectedData[0]['assignedTo'],
      application: selectedData[0]['application'],
      ticketType: selectedData[0]['ticketType'],
      createDate: selectedData[0]['createDate'],
      closeDate: selectedData[0]['closeDate'],
      reqBy: selectedData[0]['reqBy'],
      priority: selectedData[0]['priority'],
      efforts: selectedData[0]['efforts'],
      comments: selectedData[0]['comments'],
      purpose: selectedData[0]['purpose']
    })
    this.updateData = true;
  }
  submitDetails() {

    this._statsService.sendStatsData(this.buildData()).subscribe(
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
  updateDetails() {

    this._statsService.updateStatsData(this.buildData()).subscribe(
      data => {
        console.log("from node.js ", data);
        this.openDialog(data);
        this.loadTable();
        this.resetForm();
      },
      error => {
        console.log("error from node.js ", error);
        this.openDialog(error);
      }
    )

  }

  buildData() {
    const stats: IStats = {
      _id: this.statsForm.controls._id.value,
      refNumber: this.statsForm.controls.refNumber.value,
      reqSummary: this.statsForm.controls.reqSummary.value,
      reqstate: this.statsForm.controls.reqstate.value,
      assignedTo: this.statsForm.controls.assignedTo.value,
      application: this.statsForm.controls.application.value,
      ticketType: this.statsForm.controls.ticketType.value,
      createDate: this.statsForm.controls.createDate.value,
      closeDate: this.statsForm.controls.closeDate.value,
      reqBy: this.statsForm.controls.reqBy.value,
      priority: this.statsForm.controls.priority.value,
      efforts: this.statsForm.controls.efforts.value,
      comments: this.statsForm.controls.comments.value,
      purpose: this.statsForm.controls.purpose.value
    }
    return stats;
  }
  openDialog(data: any) {
    this.dialog.open(DialogBoxComponent, {
      data: data,
      panelClass: 'modalClass'
    });
  }
  resetForm() {
    setTimeout(() => {
      this.statsFormDirective.resetForm();
    }, 0);
  }
}

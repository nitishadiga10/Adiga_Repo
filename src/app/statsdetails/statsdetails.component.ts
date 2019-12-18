import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IStats } from '../Interface/stats.interface';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-statsdetails',
  templateUrl: './statsdetails.component.html',
  styleUrls: ['./statsdetails.component.scss']
})
export class StatsdetailsComponent implements OnInit {
  @Input('field1') field1: string;
  @Input('id') id: string;
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  constructor(private fb: FormBuilder, private _statsService: StatsService) { }
  leaveForm: FormGroup;
  statsFrom = this.fb.group({
    refNumber: ['', [Validators.required,Validators.pattern('^[a-zA-z{0-9}]+$')]],
    reqSummary: ['', Validators.required],
    reqstate: ['', Validators.required],
    assignedTo: ['', Validators.required],
    application: ['', Validators.required],
    ticketType: ['', Validators.required],
    createDate: ['', Validators.required],
    closeDate: ['', Validators.required],
    reqBy: ['', [Validators.required,Validators.pattern('^[a-zA-z]+$')]],
    priority: ['', Validators.required],
    efforts: ['', Validators.required],
    comments: ['', Validators.required],
    purpose: ['', Validators.required]
  });


  State: any = ["Complete", "On Hold", "In Progress"];
  Name: any = ["Nitish", "Ritabrata", "Shwetha"];
  Application: any = ["EMS", "HRM3", "MIUAC"];
  Ticket: any = ["EMS", "HRM3", "MIUAC"];
  Priority: any = ["High", "Medium", "Low"];

  ngOnInit() {
    this.leaveForm = this.fb.group({
      leaves: this.fb.array([
        this.fb.group({
          leaveDate: ['', Validators.required],
          compOff: ['', Validators.required]
        })])
    });
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

  submitDetails() {
    const stats: IStats = {
      refNumber:this.statsFrom.controls.refNumber.value,
      reqSummary:this.statsFrom.controls.reqSummary.value,
      reqstate:this.statsFrom.controls.reqstate.value,
      assignedTo:this.statsFrom.controls.assignedTo.value,
      application:this.statsFrom.controls.application.value,
      ticketType:this.statsFrom.controls.ticketType.value,
      createDate:this.statsFrom.controls.createDate.value,
      closeDate:this.statsFrom.controls.closeDate.value,
      reqBy:this.statsFrom.controls.reqBy.value,
      priority:this.statsFrom.controls.priority.value,
      efforts:this.statsFrom.controls.efforts.value,
      comments:this.statsFrom.controls.comments.value,
      purpose:this.statsFrom.controls.purpose.value
    }

    this._statsService.sendStatsData(stats);
  }
  resetForm(){
    setTimeout(() => {
    this.statsFormDirective.resetForm();
    },0);
  }
}

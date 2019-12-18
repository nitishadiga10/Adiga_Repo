import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StatsService } from '../stats.service';
import { ILeaves } from '../Interface/stats.interface';

@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.scss']
})
export class LeavedetailsComponent implements OnInit {
  @ViewChild('firstfield', { static: false }) firstfield: ElementRef;
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  constructor(private fb: FormBuilder, private _statsService: StatsService) { }
  leaveForm: FormGroup;
  statsFrom = this.fb.group({
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


  State: any = ["Complete", "On Hold", "In Progress"];
  Name: any = ["Nitish", "Ritabrata", "Shwetha"];
  Application: any = ["EMS", "HRM3", "MIUAC"];
  Ticket: any = ["EMS", "HRM3", "MIUAC"];
  Priority: any = ["High", "Medium", "Low"];

  ngAfterViewInit(){
    console.log('firstfield', this.firstfield);
  }
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

  resetForm() {
    setTimeout(() => {
      this.statsFormDirective.resetForm();
    }, 0);
  }
  submitLeaves() {
    const leavesData: ILeaves = this.leaveForm.controls.leaves.value;
    this._statsService.sendLeaveData(leavesData);

  }
}

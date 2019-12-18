import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  constructor(private fb: FormBuilder) { }
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
    console.log(this.statsFrom.controls);
  }
  resetForm(){
    setTimeout(() => {
    this.statsFormDirective.resetForm();
    },0);
  }
  submitLeaves() {
    console.log(this.leaveForm.controls.leaves.value);
  }
}

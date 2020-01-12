import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, NgForm, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StatsdetailsComponent } from '../statsdetails/statsdetails.component';
@Component({
  selector: 'app-pasthomepage',
  templateUrl: './pasthomepage.component.html',
  styleUrls: ['./pasthomepage.component.scss']
})
export class PasthomepageComponent implements OnInit {
  name: string = 'Nitish';
  @ViewChild(StatsdetailsComponent, { static: false }) _StatsdetailsComponent: StatsdetailsComponent;
  @ViewChild('statsFormDirective', { static: false }) statsFormDirective: NgForm;
  constructor(private fb: FormBuilder) { }
  leaveForm: FormGroup;
  statsForm = this.fb.group({
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

  // ngAfterViewInit() {
  //   this._StatsdetailsComponent.submitDetails();
  // }

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
    console.log(this.statsForm.controls);
  }
  resetForm() {
    setTimeout(() => {
      this.statsFormDirective.resetForm();
    }, 0);
  }
  submitLeaves() {
    console.log(this.leaveForm.controls.leaves.value);
  }
}

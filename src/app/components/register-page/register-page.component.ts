import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  message: string = "Registered";
  message1: string = "Successfully";
  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }
  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    password: ['', Validators.required]
  });
  ngOnInit() {
  }
  register() {
    if (this.registerForm.controls.firstName.value == 'NITISH' && this.registerForm.controls.lastName.value == 'ADIGA'
      && this.registerForm.controls.userName.value == 'NITISH' && this.registerForm.controls.password.value == 'NITISH') {
      this._snackBar.open(this.message, this.message1, {
        duration: 2000
      });
      this.router.navigate(["/Login"]);
    }
  }

}

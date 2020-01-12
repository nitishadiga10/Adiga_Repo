import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  message: string = "Logged-In";
  message1: string = "Successfully";
  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }
  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    password: ['', Validators.required]
  });
  ngOnInit() {
  }
  login(){
    if( this.loginForm.controls.userName.value == 'NITISH' && this.loginForm.controls.password.value == 'NITISH') {
      this._snackBar.open(this.message, this.message1, {
        duration: 2000
      });
      this.router.navigate(["/HomePage"]);
    } 
  }

}

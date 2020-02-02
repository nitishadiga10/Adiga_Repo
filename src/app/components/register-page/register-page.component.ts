import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RegisterService } from '../../services/register-service.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { user } from '../../Interfaces/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  message: string = "Registered";
  message1: string = "Successfully";
  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, private _loginService: RegisterService) { }
  registerForm = this.fb.group({
    _id: [''],
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]],
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  ngOnInit() {
  }
  buildData() {
    const user: user = {
      _id: this.registerForm.controls._id.value,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.userName.value,
      password: this.registerForm.controls.password.value
    }
    return user;
  }
  register() {
    this._loginService.registerUser(this.buildData()).subscribe(
      data => {
        console.log("from node.js ", data);
        this._snackBar.open(this.message, this.message1, {
          duration: 2000
        });
        this.router.navigate(["/Login"]);
      },
      error => {
        console.log("error from node.js ", error);
        this.openDialog(error.message);
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

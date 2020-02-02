import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoginService } from '../../services/login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  message: string = "Logged-In";
  message1: string = "Successfully";
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, private _loginService: LoginService) { }

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  ngOnInit() {
    // reset login status
    this.loginService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  buildData() {
    const user: any = {
      email: this.loginForm.controls.userName.value,
      password: this.loginForm.controls.password.value,
    }
    return user;
  }
  login() {
    this._loginService.loginUser(this.buildData()).subscribe(
      data => {
        console.log("from node.js ", data);
        this._snackBar.open(this.message, this.message1, {
          duration: 2000
        });
        this.router.navigate([this.returnUrl]);
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

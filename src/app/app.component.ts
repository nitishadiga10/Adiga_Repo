import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'LoginProject';
  message: string = "Logged-Out";
  message1: string = "Successfully";
  localStorage: any = localStorage;

  constructor(private router: Router, private loginService: LoginService, private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
    // this.router.navigate([''])
  }
  logout() {
    this.loginService.logout();
    this._snackBar.open(this.message, this.message1, {
      duration: 2000
    });
    this.router.navigate(['/Login']);
  }
}

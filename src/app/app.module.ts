import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { StatsdetailsComponent } from './statsdetails/statsdetails.component';
import { LeavedetailsComponent } from './leavedetails/leavedetails.component';
import { PasthomepageComponent } from './pasthomepage/pasthomepage.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  entryComponents: [DialogBoxComponent],
  declarations: [
    AppComponent,
    HomeScreenComponent,
    StatsdetailsComponent,
    LeavedetailsComponent,
    PasthomepageComponent,
    DialogBoxComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

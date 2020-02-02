import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsdetailsComponent } from './components/statsdetails/statsdetails.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { LeavedetailsComponent } from './components/leavedetails/leavedetails.component';
import { PasthomepageComponent } from './components/pasthomepage/pasthomepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Stats',
    component: StatsdetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Leaves',
    component: LeavedetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ExHomePage',
    component: PasthomepageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'HomePage',
    component: HomeScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Register',
    component: RegisterPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Login',
    component: LoginPageComponent
  },
  { path: '**', redirectTo: '', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

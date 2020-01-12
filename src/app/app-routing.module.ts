import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsdetailsComponent } from './components/statsdetails/statsdetails.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { LeavedetailsComponent } from './components/leavedetails/leavedetails.component';
import { PasthomepageComponent } from './components/pasthomepage/pasthomepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [{ path: 'Stats', component: StatsdetailsComponent },
{
  path: 'Leaves',
  component: LeavedetailsComponent
},
{
  path: 'ExHomePage',
  component: PasthomepageComponent
},
{
  path: 'HomePage',
  component: HomeScreenComponent
},
{
  path: 'Register',
  component: RegisterPageComponent
},
{
  path: 'Login',
  component: LoginPageComponent
},
{
  path: '',
  // redirectTo: '',
  redirectTo: 'Login',
  // component: LoginPageComponent,
  pathMatch: "full"
},
{ path: '**',redirectTo: 'Login', pathMatch: "full"  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

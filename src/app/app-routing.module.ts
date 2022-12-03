import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [

{ path: '', pathMatch: 'full', redirectTo: 'landingpage'},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'admin', component: AdminComponent},
{ path: 'landingpage', component: LandingpageComponent},
{ path: 'aboutus', component: AboutusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

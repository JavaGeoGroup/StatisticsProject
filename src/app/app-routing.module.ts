import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  {path : 'login',  component: LoginComponent},
  {path : 'home',  component: HomeComponent},
  {path : 'register',  component: RegisterComponent},
  {path : 'recover',  component: RecoverComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

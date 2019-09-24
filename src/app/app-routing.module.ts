import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path : 'login',  component: LoginComponent},
  {path : 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  {path : 'register',  component: RegisterComponent, canActivate: [AuthGuard]},
  {path : 'recover',  component: RecoverComponent},
  {path : 'change-password',  component: ChangePasswordComponent, canActivate: [AuthGuard] },
  {path : 'projects',  component: ProjectsComponent, canActivate: [AuthGuard]},
  {path : 'new-project',  component: CreateProjectComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

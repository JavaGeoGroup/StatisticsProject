import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserModel } from '../_models/user-model.model';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: UserModel;
  private loginUrl: string ='/login';
  loading = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,private alertService: AlertService) {
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).data.accountModel;
    console.log(this.currentUser);
  }

  logout(){
    this.authenticationService.logout()
    .pipe(first())
    .subscribe(
        data => {
          if(data.success){
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            this.authenticationService.deleteHeaders();
            this.router.navigate([this.loginUrl]);
          }else{
            console.log(data);
            this.alertService.error(data.errorMessage);
            this.loading = false;
          }
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }

  changePassword(){
    /*this.userService.changePassword()
    .pipe(first())
    .subscribe(
        data => {
          if(data.success){
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            this.authenticationService.deleteHeaders();
            this.router.navigate([this.loginUrl]);
          }else{
            console.log(data);
            this.alertService.error(data.errorMessage);
            this.loading = false;
          }
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  */}

}

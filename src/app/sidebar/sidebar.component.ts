import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { UserModel } from '../_models/user-model.model';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { Response } from '../_models/response.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private loginUrl: string ='/login';
  loading = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,private alertService: AlertService) {
   }

  ngOnInit() {

  }

  logout(){
    this.authenticationService.logout();
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

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserModel } from '../_models/user-model.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: UserModel;
  users: UserModel[] = [];
  private loginUrl: string ='/login';
  loading = false;
  

    constructor(private userService: UserService,
      private authenticationService: AuthenticationService,
      private router: Router,
      private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        //this.userService.getAll().pipe(first()).subscribe(users => { 
        //    this.users = users; 
        //});
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

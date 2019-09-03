import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Login } from '../_models/login.model';
import { AlertService } from './alert.service';
import { Response } from '../_models/response.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';
  private token: string;
  private headers:HttpHeaders;
  private userLoggedIn:boolean = false;
  private loginUrl: string ='/login';

  constructor(private http: HttpClient,private alertService: AlertService,
    private router: Router) { }

    login(loginModel: Login) {
        return this.http.post<Response>(this.rootUrl + '/cmc/login', loginModel)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.success && response.data && response.data.accessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(response));
                  this.token = response.data.accessToken;
                  this.headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Access-Token': this.token});
                  this.userLoggedIn = true;
                }
                return response;
            }));
            
    }

    logout() {
      this.headers = this.getHeaders();
       this.http.post<Response>(this.rootUrl + '/cmc/logout',null,{headers: this.headers}).pipe(first())
       .subscribe(
           data => {
             if(data.success){
               // remove user from local storage to log user out
               localStorage.removeItem('currentUser');
               this.deleteHeaders();
               this.router.navigate([this.loginUrl]);
             }else{
               this.alertService.error(data.errorMessage);
             }
           },
           error => {
              this.alertService.error(error);
           });;
    }

    isUserLoggedIn(){
      if(localStorage.getItem('currentUser') && this.router.url != '/login'){
        return true;
      }
      return false;
    }

    deleteHeaders(){this.headers = null;this.token = null;this.userLoggedIn = false;}

    getHeaders(){
      if(this.headers == null || this.headers == undefined){
        this.token  = JSON.parse(localStorage.getItem('currentUser')).data.accessToken;
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Token': this.token});
          this.userLoggedIn = true;
      }
      return this.headers;
    }
}

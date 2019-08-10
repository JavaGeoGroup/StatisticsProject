import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from '../_models/login.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';
  private token: string;
  private headers:HttpHeaders ; 
  private options;
  private userLoggedIn:boolean = false;
  constructor(private http: HttpClient,private alertService: AlertService) { }

    login(loginModel: Login) {
        return this.http.post(this.rootUrl + '/cmc/login', loginModel)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.success && user.data && user.data.accessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.token = user.data.accessToken;
                  let headers = new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Access-Token': this.token});
                  let options = { headers: headers };
                  this.userLoggedIn = true;
                }
                return user;
            }));
            
    }

    logout() {
      return this.http.post(this.rootUrl + `/cmc/logout`,null,this.options);
    }

    isUserLoggedIn(){return this.userLoggedIn;}
    deleteHeaders(){this.headers = null;this.options = null;this.token = null;this.userLoggedIn = false;}

    getHeaders(){return this.options;}
}

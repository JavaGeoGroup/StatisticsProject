import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { Response } from '../_models/response.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';
    constructor(private http: HttpClient,
        private authenticationService: AuthenticationService) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(signUpRequestModel: User) {
        return this.http.post<Response>(this.rootUrl + `/cmc/signUp`, signUpRequestModel,
        {headers: this.authenticationService.getHeaders()});
    }

    update(user: User) {
        return this.http.put(`/users/` + user.userRole, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

    revocery(value: string):Observable<Response>{
        return this.http.post<Response>(this.rootUrl + "/cmc/recoverPassword",JSON.parse('{ "value": "'+ value + '"}'));
    }

    changePassword(newPassword:string,oldPassword:string,confirmPassword:string){
        var changePassRequest = {
            newPassword: newPassword,
            newVerifyPassword: confirmPassword,
            oldPassword: oldPassword
        };
        return this.http.post<Response>(this.rootUrl + "/cmc/changePassword",changePassRequest,
        {headers: this.authenticationService.getHeaders()});
    }

}

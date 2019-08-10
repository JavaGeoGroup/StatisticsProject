import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(signUpRequestModel: User) {
        return this.http.post(this.rootUrl + `/cmc/signUp`, signUpRequestModel);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.userRole, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

    revocery(value: string){
        return this.http.post(this.rootUrl + "/cmc/recoverPassword",JSON.parse('{ "value": "'+ value + '"}'));
    }

    changePassword(){
        
    }

}

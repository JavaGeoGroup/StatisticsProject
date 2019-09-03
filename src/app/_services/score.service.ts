import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Response } from '../_models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

    getScores() {
      return this.http.get<Response>(this.rootUrl + '/project/getScores',
      {headers: this.authenticationService.getHeaders()});
  }
}

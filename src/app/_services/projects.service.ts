import { Injectable } from '@angular/core';
import { ScoresResponse } from '../_models/scores-response.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Company } from '../_models/company.model';
import { TypesResponse } from '../_models/types-response.model';
import { CompanyResponse } from '../_models/company-response.model';
import { Response } from '../_models/response.model';
import { Project } from '../_models/project.model';
import { ProjectsResponse } from '../_models/projects-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private rootUrl: string = 'http://cmc-consulting.us-east-2.elasticbeanstalk.com';

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getTypes(){
    return this.http.get<TypesResponse>(this.rootUrl + '/project/projectTypes',
      {headers: this.authenticationService.getHeaders()});
  }
  getCompanies(){
    return this.http.get<CompanyResponse>(this.rootUrl + '/project/companies',
      {headers: this.authenticationService.getHeaders()}); 
  }

  createProject(project: Project){
    console.log("project");
    console.log(project);
    return this.http.post<Response>(this.rootUrl + '/project/general',project,
      {headers: this.authenticationService.getHeaders()}); 
  }

  getProjects(){
    return this.http.get<ProjectsResponse>(this.rootUrl + '/project/general',
      {headers: this.authenticationService.getHeaders()}); 
  }

}

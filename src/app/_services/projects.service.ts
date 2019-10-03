import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
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

  createProject(formData: FormData){
    return this.http.post<Response>(this.rootUrl + '/project/general',formData,
      {headers: this.authenticationService.getHeadersWithMultiPartData(),
      reportProgress: true}); 
  }

  getProjects(page:number){
    return this.http.get<ProjectsResponse>(this.rootUrl + '/project/getProjects?offset=' + page*4 + "&count=" + 4,
      {headers: this.authenticationService.getHeaders()}); 
  }

}

import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { ProjectsService } from '../_services/projects.service';
import { first } from 'rxjs/operators';
import { Project } from '../_models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  loading = false;
  submitted = false;
  headElements = ['Client Name','Project Name','Type Desc.', 'Manager', 'Start Date', 'End Date', 'Address', 'Description', 'Create date', 'Version Date'];
  page: number;
  dataSize:number;

  constructor(private projectsService: ProjectsService, private alertService: AlertService) { }

  ngOnInit() {
    this.page=1;
    this.getProjects();
  }

  private getProjects() {
    this.projectsService.getProjects(this.page-1)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(data && data.success){
            //this.projects = new Array<Project>(data.dataSize);
            this.projects = data.data;
            this.dataSize=data.dataSize;
          }else{
            this.alertService.error(data.errorMessage);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private pageChanged(event){
    this.page = event;
    this.getProjects();
  }

}

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

  constructor(private projectsService: ProjectsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getProjects();
  }

  private getProjects() {
    this.projectsService.getProjects()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(data && data.success){
            this.projects = data.data;
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

}

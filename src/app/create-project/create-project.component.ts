import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../_services/projects.service';
import { AlertService } from '../_services/alert.service';
import { DatePipe } from '@angular/common';
import { Type } from '../_models/type.model';
import { Company } from '../_models/company.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  newProjectForm: FormGroup;
  loading = false;
  submitted = false;
  startDate = new Date();
  endDate = this.startDate.getDate() + 1;
  types: Type[] = [];
  companies: Company[] = [];

  constructor(private formBuilder: FormBuilder,
    private projectsService: ProjectsService, private alertService: AlertService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getCompanies();
    this.getTypes();
    this.newProjectForm = this.formBuilder.group({
      client: [, Validators.required],
      projectName: ['', Validators.required],
      projectType: [, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required]
      //picture: [, Validators.required]
  });
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }


  private getTypes(){
    this.projectsService.getTypes()
      .pipe(first())
      .subscribe(
        data => {
          if(data && data.success){
            this.types = data.data;
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

  private getCompanies(){
    this.projectsService.getCompanies()
      .pipe(first())
      .subscribe(
        data => {
          if(data && data.success){
            this.companies = data.data;
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

  get f() { return this.newProjectForm.controls; }

  onSubmit() {
    this.newProjectForm.value.client = this.companies[this.newProjectForm.value.client];
    this.newProjectForm.value.projectType = this.companies[this.newProjectForm.value.projectType];
    this.newProjectForm.value.startDate = new Date(this.newProjectForm.value.startDate);
    this.newProjectForm.value.endDate = new Date(this.newProjectForm.value.endDate);
    //const formdata: FormData = new FormData();
    //formdata.append('file', this.newProjectForm.value.picture);
    //this.newProjectForm.value.picture = formdata;
    
    this.submitted = true;
    //stop here if form is invalid
    if (this.newProjectForm.invalid) {
        return;
    }
    this.loading = true;
    this.projectsService.createProject(this.newProjectForm.value)
        .pipe(first())
        .subscribe(
            data => {
              if(data && data.success){
                this.alertService.success('Project created successfully', true);
                this.loading = false;
                //this.router.navigate(['/login']);
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

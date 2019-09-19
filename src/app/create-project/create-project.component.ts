import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../_services/projects.service';
import { AlertService } from '../_services/alert.service';
import { DatePipe } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder,
    private projectsService: ProjectsService, private alertService: AlertService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.newProjectForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      desctiption: ['', Validators.required],
      picture: ['', Validators.required]
  });
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}


  get f() { return this.newProjectForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newProjectForm.invalid) {
        return;
    }
    this.loading = true;
  }

}

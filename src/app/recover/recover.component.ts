import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  recoveryForm: FormGroup;
  loading = false;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
    private router: Router,private userService: UserService,
    private alertService: AlertService) { }

    ngOnInit() {
      this.recoveryForm = this.formBuilder.group({
          mail: ['', [Validators.required,Validators.email]]
      });
  }

  get f() { return this.recoveryForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.recoveryForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.revocery(this.recoveryForm.value.mail)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if(data && data.success){
                this.alertService.success('Password recoveried successfully', true);
                this.router.navigate(['/login']);
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

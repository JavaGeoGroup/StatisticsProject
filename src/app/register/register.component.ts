import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,private userService: UserService,
    private alertService: AlertService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
          mail: ['', [Validators.required,Validators.email]],
          userRole: ['', Validators.required],
          userName: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              if(data && data.success){
                this.alertService.success('Registration successful', true);
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

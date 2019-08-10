import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = '/home';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }
get f() { return this.loginForm.controls; }


onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
          data => {
            if(data.success){
              this.router.navigate([this.returnUrl]);
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

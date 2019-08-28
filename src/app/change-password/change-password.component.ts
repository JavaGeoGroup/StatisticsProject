import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid || 
      this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmPassword) {
        return;
    }
    this.loading = true;
    this.userService.changePassword(this.changePasswordForm.value.newPassword,
      this.changePasswordForm.value.oldPassword,
      this.changePasswordForm.value.confirmPassword)
        .pipe(first())
        .subscribe(
            data => {
              if(data && data.success){
                this.alertService.success('Password has been changes successfully', true);
                this.authenticationService.logout();
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

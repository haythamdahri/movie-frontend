import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loginSubscription: Subscription;

  // To display message if bad login credentials
  loginStatus = {
    error: false,
    status: 0,
    message: ''
  };

  constructor(private titleService: Title,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription != null) {
      this.loginSubscription.unsubscribe();
    }
  }

  onLogin() {
    if (this.form.valid) {
      this.loginSubscription = this.authService.login({email: this.form.value.email, password: this.form.value.password}).subscribe(
        (response: HttpResponse<any>) => {
          const jwt = response.headers.get('Authorization');
          this.authService.saveToken(jwt, this.form.value.email);
          this.router.navigate(['']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 403) {
            this.loginStatus.error = true;
            this.loginStatus.status = error.status;
            this.loginStatus.message = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Bad credentials, username and password are incorrect!';
          }
        }
      );
    } else {

    }
  }
}

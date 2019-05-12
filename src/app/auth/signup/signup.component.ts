import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      confirmPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    });
  }



  onLogin() {
    console.log(this.form);
  }
}

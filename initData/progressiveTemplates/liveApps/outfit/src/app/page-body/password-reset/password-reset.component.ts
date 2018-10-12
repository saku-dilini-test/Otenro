import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as data from '../../madeEasy.json';
import { SERVER_URL } from '../../constantsService';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  private rxjsSubject = new Subject<string>();
  successMessage; errorMessage;
  private appId = (<any>data).appId;
  pResetForm: FormGroup;
  pResetData = { "password": "", "confirmPassword": "" };
  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  email; 

  constructor(
    private title: TitleService, 
    private activatedRoute: ActivatedRoute, 
    private http: HttpClient,
    private route: Router,) {

    this.title.changeTitle('Password Reset');

    this.pResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_PATTERN)]),
      confirmPassword: new FormControl('', [Validators.required,  Validators.pattern(this.PASSWORD_PATTERN), this.equalTo('password')])
    });
  }

  ngOnInit() {

    // Get encrypted email from url query string 
    this.activatedRoute.queryParams
      .subscribe(params => {

        this.email = params['email'];
      });
  }

  /**
   * Check equality of password and confirmPassword
   * @param field_name :: compare with what
  **/
  equalTo(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input;
      if (!isValid)
        return {'equalTo': {isValid}};
      else
        return null;
    };
  }

  resetPassword() {

    let data = { email: this.email, appId: this.appId, password: this.pResetData.password };

    this.http.post(SERVER_URL + '/templatesAuth/resetPassword', data)
      .subscribe((res : any) => {
        
        if (res.message === 'success') {

          this.rxjsSubject.subscribe((message) => this.successMessage = message);
          debounceTime.call(this.rxjsSubject, 4000)
            .subscribe(() => this.successMessage = null);
          this.rxjsSubject.next('Your password is reset successfully');
          setTimeout(() => {
            
            this.route.navigate(['login/home']);
          }, 3100);
        }

        if (res.message === 'error' || res.message === 'failed') {

          this.rxjsSubject.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this.rxjsSubject, 4000)
            .subscribe(() => this.errorMessage = null);
          this.rxjsSubject.next('Unknown error occurred. Please try again');
          setTimeout(() => {}, 3100);
        }

        if (res.message === 'user not found') {

          this.rxjsSubject.subscribe((message) => this.errorMessage = message);
          debounceTime.call(this.rxjsSubject, 4000)
            .subscribe(() => this.errorMessage = null);
          this.rxjsSubject.next('You are not registerd.');
          setTimeout(() => {}, 3100);
        }
      });

  }

}

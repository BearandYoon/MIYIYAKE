import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  subscription: Subscription;
  message: string;
  isError: boolean;

  constructor(
    private _authService: AuthService
  ) {
    this.subscription = this._authService.userSignUpActivity$.subscribe(
      message => {
        console.log(message);
        if (message.isTrue) {
          this.isError = false;
        } else {
          this.isError = true;
        }
        this.message = message.content;
      }
    );
  }

  ngOnInit() {
  }

  OnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(formData): void {
    if (formData.valid) {
      console.log('formData = ', formData.value);
      this._authService.signUpWithEmail(formData.value.email, formData.value.password);
    }
  }
}

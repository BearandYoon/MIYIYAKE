import { Component, OnInit } from '@angular/core';
// import { moveIn } from '../router.animations';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // animations: [moveIn()],
  // host: {'[@moveIn]': ''}
})

export class LoginComponent implements OnInit {
  error: any;
  currentUser: any;

  constructor(
    private _authService: AuthService,
    private _routerService: Router
  ) {
    this._authService.getAuthenticationState().subscribe(res => {
      if (res) {
        this._routerService.navigate(['/dashboard'])
      }});
  }

  ngOnInit() {
  }

  loginGoogle() {
    this._authService.loginWithGoogle();
  }
}

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

  constructor(
    private _authService: AuthService,
    private _routerService: Router
  ) {
    this._authService.getAuthenticationState().subscribe(res => {
      if (res) {
        this._routerService.navigate(['/members']);
      }});
  }

  ngOnInit() {
  }

  loginGoogle(): void {
    this._authService.loginWithGoogle();
  }
}

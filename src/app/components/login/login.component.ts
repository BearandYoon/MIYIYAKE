import { Component, OnInit } from '@angular/core';
// import { moveIn } from '../router.animations';

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

  constructor( private _authService: AuthService ) {
    this.currentUser = _authService.getCurrentUser();
    console.log('currentUser = ', this.currentUser);
  }

  ngOnInit() {
  }
}

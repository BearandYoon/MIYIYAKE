import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { UserInfo } from '../../models/user';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  user: UserInfo = new UserInfo('test@email.com', 'password');

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(formData): void {
    if (formData.valid) {
      this._authService.loginWithEmail(formData.value.email, formData.value.password);
    }
  }
}

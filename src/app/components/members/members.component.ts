import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(
    private _authService: AuthService,
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this._authService.logOut();
  }

}

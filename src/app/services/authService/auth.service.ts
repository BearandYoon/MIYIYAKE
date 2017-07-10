import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { MessageInfo } from 'app/models/message';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private _userSignUpActivity = new Subject<any>();
  signUpMessage: MessageInfo = new MessageInfo(false, '');

  userSignUpActivity$ = this._userSignUpActivity.asObservable();

  constructor(
    public afAuth: AngularFireAuth,
    private localStorageService: LocalStorageService,
    private routerService: Router
  ) {
    this.user = afAuth.authState;
  }

  getAuthenticationState(): Observable<firebase.User> {
    return this.user;
  }

  signUpWithEmail(email, pass) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(res => {
        this.saveToken(res);
        this.signUpMessage.isTrue = true;
        this.signUpMessage.content = 'Success!';
        this._userSignUpActivity.next(this.signUpMessage);
      })
      .catch(error => {
        // Handle Errors here.
        this.signUpMessage.isTrue = false;
        this.signUpMessage.content = error;
        this._userSignUpActivity.next(this.signUpMessage);
      });
  }

  loginWithEmail(email, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(res => {
        this.saveToken(res);
      });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.saveToken(res);
      });
  }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.saveToken(res);
      });
  }

  logOut() {
    this.localStorageService.remove('USER_INFO');
    this.afAuth.auth.signOut()
      .then(res => { this.routerService.navigate(['/login']); });
  }

  saveToken(res) {
    this.localStorageService.set('USER_INFO', JSON.stringify(res));
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

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
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error['code'];
        const errorMessage = error['message'];
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
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
      .then(res => {this.routerService.navigate(['/login'])});
  }

  saveToken(res) {
    this.localStorageService.set('USER_INFO', JSON.stringify(res));
  }
}

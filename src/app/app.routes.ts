/**
 * Created by mac on 7/6/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';
import { MembersComponent } from './components/members/members.component';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'members', component: MembersComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

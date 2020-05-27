import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoRootComponent } from './components/todo-root/todo-root.component'
import { LoginComponent }  from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { ProfileComponent } from './components/profile/profile.component'
import { TodoStatusComponent } from "./components/todo-status/todo-status.component";
import {  AuthenticatedGuard } from './guards/auth/authenticated-guard';
import { GuestGuard } from './guards/guest/guest-guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', 
    component: TodoRootComponent,
    canActivate: [AuthenticatedGuard]
  },

  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [GuestGuard] 
  },
  {
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [GuestGuard] 
  },
  {
    path: ':username', component: ProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: ':username/status/:todoId',
    component: TodoStatusComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

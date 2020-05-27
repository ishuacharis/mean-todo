import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { StoreModule } from "@ngrx/store";

import { from } from 'rxjs';

import { AuthInterceptor } from "./interceptors/auth.interceptors";

import { GetTodoReducer  } from "./reducers/todos/todo.reducers";

import { AppComponent } from './app.component';
import { TodoRootComponent } from './components/todo-root/todo-root.component';
import { TodoSingleComponent } from './components/todo-single/todo-single.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth/auth-service.service';
import { AuthenticatedGuard } from './guards/auth/authenticated-guard';
import { GuestGuard } from './guards/guest/guest-guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TodoStatusComponent } from './components/todo-status/todo-status.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthReducer } from './reducers/auth/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodoRootComponent,
    TodoSingleComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ShowErrorsComponent,
    ProfileComponent,
    PageNotFoundComponent,
    AddTodoFormComponent,
    TodoStatusComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({todos: GetTodoReducer})
  ],
  providers: [
    AuthService, 
    AuthenticatedGuard, 
    GuestGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

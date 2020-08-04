import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NewPostComponent } from './admin/new-post/new-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AdminComponent,
    NewPostComponent,
    NotFoundComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

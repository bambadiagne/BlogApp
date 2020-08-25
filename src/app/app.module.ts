import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuardAdminService } from "./services/auth-guard-admin.service";
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NewPostComponent } from './admin/new-post/new-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {  AdminPageService } from "./services/admin-page.service";
import { PostService } from "./services/post.service";
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { SinglePostsComponent } from './posts/single-posts/single-posts.component';
import { CardPostsComponent } from './posts/card-posts/card-posts.component';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { RemovepostComponent } from './admin/removepost/removepost.component';
import { CommentService } from "./services/comments.service";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AdminComponent,
    NewPostComponent,
    NotFoundComponent,
    NavBarComponent,
    AllPostsComponent,
    SinglePostsComponent,
    CardPostsComponent,
    NewUserComponent,
    AdminHomeComponent,
    RemovepostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  providers: [
    AuthGuardAdminService,
    AuthService,
    AdminPageService,
    PostService,
    CookieService,
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

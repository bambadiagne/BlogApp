import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AdminComponent } from './admin/admin.component';
import { NewPostComponent } from './admin/new-post/new-post.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"auth/signup",component:SignUpComponent},
  {path:"auth/signin",component:SignInComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/newpost',component:NewPostComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

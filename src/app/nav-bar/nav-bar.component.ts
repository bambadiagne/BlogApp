import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';  
import { CookieService } from 'ngx-cookie-service';
import { AdminPageService } from '../services/admin-page.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAuthAdmin=this.cookieService.check("username");
  isAuth:boolean;
  constructor(private authService:AuthService,
    private cookieService:CookieService,
    private adminPage:AdminPageService,
    private router:Router) { }

  ngOnInit(): void {
    
    setInterval(()=>{
      this.showNavbar();
    },2000);
    
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
        }else{
          this.isAuth=false;
        }
      }
    );
    }

  signOutAdminUser(){
    this.isAuthAdmin=false;
    
    this.adminPage.logOutAdminUser();
           
  }
  showNavbar(){
    if(this.router.url.startsWith("/admin") || this.isAuthAdmin){
      this.isAuthAdmin=true;
      this.ngOnInit();
    }

  }
  signOutUser(){
  this.authService.signOutUser();
  
}
  
}

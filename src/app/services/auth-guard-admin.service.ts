import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { AdminPageService } from './admin-page.service';
import { AdminUser } from '../model/adminUser.model';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuardAdminService implements CanActivate,OnInit {

  usersArrayGuard:AdminUser[]=[];
  userSubscription:Subscription;
  constructor(private router: Router,
    private adminPage: AdminPageService,
    private cookieService: CookieService) 
    
    {
    
    
  }
  
  
  ngOnInit(){
    this.userSubscription=this.adminPage.usersSubject.subscribe((users:AdminUser[])=>{
      this.usersArrayGuard=users;
    });
    this.adminPage.emitUsers();
  }
 
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.usersArrayGuard);
   
    return new Promise(
      (resolve, reject) => {
        if (this.cookieService.get('isLogged')=='true' && this.cookieService.check('sessionID')) {

          resolve(true);
        } else {

          this.router.navigate(['/admin']);
          reject(false);
        }

      }
    )   
  }
 
}
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AdminUser } from "../model/adminUser.model";
import * as bcrypt from 'bcryptjs';
import { CookieService } from "ngx-cookie-service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  allUsers: AdminUser[] = [];
  usersSubject=new Subject<AdminUser[]>();
  constructor(private cookieService: CookieService) {
    this.getAllUsers();
   }

  createAdminUser(user: AdminUser) {
    user.sessionid=user.id+user.password;
   
    user.password = bcrypt.hashSync(user.password, 10);
    this.allUsers.push(user);
    firebase.database().ref('/admin').set(this.allUsers);
    this.emitUsers();
  }
emitUsers(){
  this.usersSubject.next(this.allUsers.slice());

}

  getAllUsers() {

    firebase.database().ref('/admin')
      .on('value', (data: firebase.database.DataSnapshot) => {
        this.allUsers = data.val()?data.val():[];
         }
      
      );
    this.emitUsers();
     
  }


  signInAdminUser(user: AdminUser) {
    let bolUser: boolean = false;
    this.allUsers.forEach((value) => {
     
      if (bcrypt.compareSync(user.password, value.password) && user.username == value.username) {
        this.cookieService.set("isLogged",'true',0,"/admin","localhost",false);     
        this.cookieService.set("sessionID",bcrypt.hashSync(value.id+user.password,10),0,"/admin",);
        bolUser = true;
      }
    });

    return bolUser;
  };



  logOutAdminUser() {
    this.cookieService.delete('isLogged');
    this.cookieService.delete('sessionID');
  };
}
/*

   //////////To review next time/////////////////////////////
  isUserLogged(userArray:AdminUser[]){
    
    console.log(this.allUsers);
   
    userArray.forEach((value) => {
      if (bcrypt.compareSync(value.sessionid,this.cookieService.get('sessionID'))) {
        this.isLogged=true;        
            }
    });
   
    return this.isLogged;  
  }
};
*/

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';  
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAuth:boolean;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
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
signOutUser(){
  this.authService.signOutUser();
}
  
}

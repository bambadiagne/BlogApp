import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCMIWxfV3ZY7zT5KWX2vc_0Ac6r1-qEzm4",
      authDomain: "bioblog-sn.firebaseapp.com",
      databaseURL: "https://bioblog-sn.firebaseio.com",
      projectId: "bioblog-sn",
      storageBucket: "bioblog-sn.appspot.com",
      messagingSenderId: "426893743734",
      appId: "1:426893743734:web:2c600aba74b63784a53157"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

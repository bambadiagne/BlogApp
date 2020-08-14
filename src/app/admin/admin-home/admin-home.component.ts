import { Component, OnInit } from '@angular/core';
import { AdminPageService } from 'src/app/services/admin-page.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private adminPage:AdminPageService) { }

  ngOnInit(): void {
  this.adminPage.getAllUsers();
  }
  logOut(){
    
    this.adminPage.logOutAdminUser();
  }
}

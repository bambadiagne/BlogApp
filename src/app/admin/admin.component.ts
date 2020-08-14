import { Component, OnInit } from '@angular/core';
import { AdminPageService } from '../services/admin-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  errorMessage:string;
  adminUserForm:FormGroup;
  constructor(private adminService:AdminPageService,
    private formBuid:FormBuilder,
    private router:Router,
    private cookieService:CookieService,
      ) { }

  ngOnInit(): void {
   this.initForm();
   this.adminService.getAllUsers();
  }
  initForm(){
    this.adminUserForm=this.formBuid.group({
      username:["",Validators.required],
      password:['',Validators.required],
    })
  }
  onSubmit(){
      let user=this.adminUserForm.value;
       
       if(this.adminService.signInAdminUser(user)){
 
        this.router.navigate(['/admin','home']);
      }
       else{
        this.errorMessage='Utilisateur ou mot de passe erroné';   
        
       }
       
       
      }
}

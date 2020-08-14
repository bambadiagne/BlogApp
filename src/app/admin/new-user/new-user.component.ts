import { Component, OnInit } from '@angular/core';
import { AdminPageService } from 'src/app/services/admin-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUser } from 'src/app/model/adminUser.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
 
  errorMessage:string;
  newUserForm:FormGroup;
  constructor(private adminService:AdminPageService,
    private formBuid:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
   this.initForm();
   this.adminService.getAllUsers();
  }
  initForm(){
    this.newUserForm=this.formBuid.group({
      username:["",Validators.required],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    })
  }
  onSubmit(){
      let user=this.newUserForm.value;
      setTimeout(()=>{
        this.adminService.createAdminUser(new AdminUser(this.adminService.allUsers.length?this.adminService.allUsers.length+1:1,user['username'],user['password'],""));
        this.router.navigate(['/admin',"home"]);
      },2000);
       
       
      }
}

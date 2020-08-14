import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  userForm:FormGroup;
  errorMessage:string;
  constructor(private formbuild:FormBuilder,
    private router:Router,
    private authService:AuthService) { }


  ngOnInit(): void {
    this.initForm();
  }
   initForm(){
    this.userForm= this.formbuild.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    });
 
   }
  onSubmit() {
    const signUser = this.userForm.value;
    
    this.authService.createNewUser(signUser['email'],signUser['password']).then(
      () => {
        this.router.navigate(['/auth','signin']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }


}

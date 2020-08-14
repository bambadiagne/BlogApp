import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

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
      email:[null,[Validators.required,Validators.email,]],
      password:[null,[Validators.required,]],
    });
 
   }
  onSubmit() {
    const signUser = this.userForm.value;
    
    this.authService.signInUser(signUser['email'],signUser['password']).then(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}

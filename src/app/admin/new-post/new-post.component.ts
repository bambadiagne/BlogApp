import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  success:boolean=true;
  postForm:FormGroup;
  constructor(private postService:PostService,
    private router:Router,
    private formBuild:FormBuilder) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.initForm();
  }
  initForm(){
    this.postForm=this.formBuild.group({
      title:['',Validators.required],
      content:['',Validators.required],
    })
  };
 onSubmit(){
   const addPost=this.postForm.value;
    this.postService.createNewPost(new Post(this.postService.postArray.length +1,addPost['title'],addPost['content'],new Date().toDateString()));
    this.success=false;
    setTimeout(()=>{
       
    this.router.navigate(['/admin','home']);
   },2000);
   

 }
}

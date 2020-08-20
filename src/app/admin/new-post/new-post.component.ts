import { Component, OnInit } from '@angular/core';
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
  fileIsUploading=false;
  fileUploaded=false;
  fileUrl:string[]=[];
  
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
 let postObject=new Post(this.postService.postArray.length +1,addPost['title'],addPost['content'],new Date().toDateString(),[])
   if(this.fileUrl.length>0) {
    postObject.photo = this.fileUrl;
  } 
   this.postService.createNewPost(postObject);
    this.success=false;
    setTimeout(()=>{
       
    this.router.navigate(['/admin','home']);
   },2000);
   

 }
 onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.postService.uploadFile(file).then(
    (url: string) => {
      this.fileUrl.push(url);
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  );
}

detectFiles(event) {
  console.log(event.target.files);
  for(let i=0;i<event.target.files.length;i++){
  this.onUploadFile(event.target.files[i]);
}
}

}

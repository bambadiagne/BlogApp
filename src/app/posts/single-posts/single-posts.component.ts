import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-single-posts',
  templateUrl: './single-posts.component.html',
  styleUrls: ['./single-posts.component.css']
})
export class SinglePostsComponent implements OnInit {
  title:string="1";
  content:string="sdkjskdjsmkld";
  date:string="20112121";
  constructor(private activatedRoute:ActivatedRoute,
    private postService:PostService) 
    { 
    }

  ngOnInit(): void {
    this.postService.getSinglePost(this.activatedRoute.snapshot.params['id']-1).then((post:Post)=>{
      console.log(this.postService.postArray); 
      
      this.date=post.date;
      this.title=post.title;
      this.content=post.content;
      this.addContent();  
 
    }).catch((error)=>{
       alert(error);
     })
   
    }

    addContent(){
    
        
        let content=document.createElement('div');
        content.innerHTML=this.content;
        document.getElementById('content').appendChild(content);
      
    }
  }


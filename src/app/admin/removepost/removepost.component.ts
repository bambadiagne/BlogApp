import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-removepost',
  templateUrl: './removepost.component.html',
  styleUrls: ['./removepost.component.css']
})
export class RemovepostComponent implements OnInit {

AllPosts:Post[];
PostSubs:Subscription;
  constructor(private postService:PostService,
    private router:Router) { }

  ngOnInit(): void {
   this.postService.getPosts();
    this.PostSubs= this.postService.postSubject.subscribe((posts:Post[])=>{
      this.AllPosts=posts;
    });
    this.postService.emitPosts();
    console.log(this.AllPosts);
   
  }

  deletePost(post:Post){
    console.log(post);
    this.postService.removePost(post);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit,OnDestroy {
  allPosts:Post[]=[];
  postSubscription:Subscription;
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postSubscription=this.postService.postSubject.subscribe((posts:Post[])=>{
      this.allPosts=posts;
    });
    this.postService.emitPosts();
  
  }
 
  

  ngOnDestroy(){
   this.postSubscription.unsubscribe();
  }
}

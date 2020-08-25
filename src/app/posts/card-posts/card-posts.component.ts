import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-card-posts',
  templateUrl: './card-posts.component.html',
  styleUrls: ['./card-posts.component.css']
})
export class CardPostsComponent implements OnInit {
  responsive=false
 
  @Input() postOne:Post;
  
  constructor() { }
   
  
  ngOnInit(): void {
  this.postOne.content=this.postOne.content.replace('<p>',"")
    let  responsive =window.screen.width<300?true:false;
  }
 getLikes(){
  
 }  
}

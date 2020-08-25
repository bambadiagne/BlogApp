import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comments.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Post } from 'src/app/model/post.model';
import { Comment } from "src/app/model/comment.model";
import * as firebase from "firebase";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-posts',
  templateUrl: './single-posts.component.html',
  styleUrls: ['./single-posts.component.css']
})
export class SinglePostsComponent implements OnInit, OnDestroy {
  isAuth = false;
  title: string = "Article en chargement";
  content: string = "Chargement du post";
  date: string = "20112121";
  valueRating = 0;
  //Current user
  idUser: string;
  username: string;
  userPhoto:string;
  commentPost=false;
  //

  ratingForm: FormGroup;
  usersCommentArray: Comment[];
  commentSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private formBuild: FormBuilder) {
  }

  ngOnInit(): void {
    
    this.commentSubscription = this.commentService.commentSubject.subscribe((comments: Comment[]) => {
      this.usersCommentArray = comments
    })

    this.initForm();
    this.postService.getSinglePost(this.activatedRoute.snapshot.params['id'] - 1).then((post: Post) => {

      this.date = post.date;
      this.title = post.title;
      this.content = post.content;
      this.addContent();

    }).catch((error) => {
      alert(error);
    })

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.idUser = user.uid;
          this.username = user.displayName;
          this.userPhoto=user.photoURL;
        } else {
          this.isAuth = false;
        }
      }
    );

  }
  ngOnDestroy() {
    this.commentSubscription.unsubscribe();
  }
  initForm() {
    this.ratingForm = this.formBuild.group({
      comment: ['', [Validators.required]],

    });

  }

  onSubmit() {
    this.commentService.createNewComment(new Comment(this.commentService.commentArray.length+1,this.idUser, this.username, this.ratingForm.value['comment'], this.valueRating, new Date().toLocaleDateString(undefined,{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })))
  }

  getValue(value) {

    this.valueRating = value;

  }
  addContent() {


    let content = document.createElement('div');
    content.innerHTML = this.content;
    document.getElementById('content').appendChild(content);

  }
}


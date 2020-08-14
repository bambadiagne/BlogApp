import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from "../model/post.model";
import * as firebase from "firebase";
@Injectable({
  providedIn: 'root'
})
export class PostService{

  constructor() { }

  postArray:Post[]=[];
  postSubject=new Subject<Post[]>();

  emitPosts(){
    this.postSubject.next(this.postArray);
  }
  savePosts() {
    firebase.database().ref('/posts').set(this.postArray);
}
  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: firebase.database.DataSnapshot) => {
          this.postArray = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }
  
  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewPost(post:Post){
    this.postArray.push(post);
    this.savePosts();
    this.emitPosts();
  }
  removePost(post:Post) {
    const postIndexToRemove = this.postArray.findIndex(
      (postElement) => {
        if(postElement === post) {
          return true;
        }
      }
    );
    this.postArray.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
  
}

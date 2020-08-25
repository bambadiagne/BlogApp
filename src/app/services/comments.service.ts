import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from "../model/comment.model";
import * as firebase from "firebase";
@Injectable({
  providedIn: 'root'
})
export class CommentService{

  constructor() {
    this.getComments();
   }

  commentArray:Comment[]=[];
  commentSubject=new Subject<Comment[]>();

  emitComments(){
    this.commentSubject.next(this.commentArray.slice());
  }
  saveComments() {
    firebase.database().ref('/comments').set(this.commentArray);
}
  getComments() {
    firebase.database().ref('/comments')
      .on('value', (data: firebase.database.DataSnapshot) => {
          this.commentArray = data.val() ? data.val() : [];
          this.emitComments();
        }
      );
  }
  
  getSingleComment(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/comments/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewComment(comment:Comment){
    this.commentArray.push(comment);
    this.saveComments();
    this.emitComments();
  }
  removeComment(comment:Comment) {
    
   
    
    const commentIndexToRemove = this.commentArray.findIndex(
      (commentElement) => {
        if(commentElement === comment) {
          return true;
        }
      }
    );
    this.commentArray.splice(commentIndexToRemove, 1);
    this.saveComments();
    this.emitComments();
  }
 
}

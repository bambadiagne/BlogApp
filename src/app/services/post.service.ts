import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from "../model/post.model";
import * as firebase from "firebase";
@Injectable({
  providedIn: 'root'
})
export class PostService{

  constructor() {
    this.getPosts();
   }

  postArray:Post[]=[];
  postSubject=new Subject<Post[]>();

  emitPosts(){
    this.postSubject.next(this.postArray.slice());
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
    
    if(post.photo.length>0){
        post.photo.forEach(element => {
          let storageRef= firebase.storage().refFromURL(element);
          storageRef.delete().then(()=>{
            console.log("Photo supprimé");

          }).catch((error)=>{
            console.log("Il y'a eu un probleme au moment de la suppression"+error);
          })
        });

    }
    
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
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
}

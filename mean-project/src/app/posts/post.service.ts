import{Post} from './post.model';
import{Subject} from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

 @Injectable({providedIn:'root'})

export class PostsService{

  constructor(private http: HttpClient){}
  private posts: Post[]=[];
  private postUpdated = new Subject<Post[]>();

  getPost(){
    //return [...this.posts]
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      this.posts=postData.posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title:string,content:string){

    const post:Post ={id:null,title:title,content:content};

    this.http.post<{message:string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      // data will only push to post form if we get successfull response from server
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });


  }
}

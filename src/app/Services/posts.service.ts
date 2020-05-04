import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../Models/postInterface.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PostsService{

    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title, content};
        // Send Http request
        this.http.post<{name: string}>(
        'https://http-angularcourse.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
          this.error.next(error.message);
      });
    }

    fetchPosts(){
        // <> - Defininf the type, what will be the value of the response data using our interface POST
        // Which will have a key encrypted as a string, which will be a post

        // Returning the observable
        return this.http
        .get<{ [key: string]: Post }>(
            'https://http-angularcourse.firebaseio.com/posts.json',
            { headers: new HttpHeaders({'Custom-Header': 'Hello'}) }
        )
        .pipe(
            map((responseData) => {
                const postsArray: Post[] = [];
                for ( const key in responseData ){
                  if (responseData.hasOwnProperty(key)){
                    postsArray.push({ ...responseData[key], id: key});
                  }
                }
                return postsArray;
            }),
            // If you need to do some operation when the error occurs
            catchError(errorRes => {
                // Send to analytics server
                return throwError(errorRes);
            })
        );
    }

    deletePosts(){
        return this.http.delete('https://http-angularcourse.firebaseio.com/posts.json');
    }
}

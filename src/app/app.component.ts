import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Models/postInterface.model';
import { PostsService } from './Services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  private errorSub: Subscription;

  // To show a loading indicator on the template
  isFetching = false;

  // To check if there is any error and display it to the user
  error = null;

  constructor(private http: HttpClient,
              private posts: PostsService) {}

  ngOnInit() {

    this.errorSub = this.posts.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.fetchingPosts();
  }

  onCreatePost(postData: Post) {
    this.posts.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchingPosts();
  }

  onClearPosts() {
    // Send Http request

    // Since the function inside the subscribe will only work if the method succeded,
    // We can cler the loaded posts in there
    this.posts.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fetchingPosts(){
    this.isFetching = true;

    this.posts.fetchPosts().subscribe(posts =>  {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error.message);
    });
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

}

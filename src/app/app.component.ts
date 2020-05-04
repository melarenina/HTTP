import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Models/postInterface.model';
import { PostsService } from './Services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];

  // To show a loading indicator on the template
  isFetching = false;

  constructor(private http: HttpClient,
              private posts: PostsService) {}

  ngOnInit() {
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
  }

  private fetchingPosts(){
    this.isFetching = true;

    this.posts.fetchPosts().subscribe(posts =>  {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }


}

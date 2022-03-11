import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, PostData } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  fetchPosts() {
    return this.http.get<Post[]>(environment.apiUrl + '/posts');
  }

  createPost(postData: PostData) {
    const formData = new FormData();

    Object.keys(postData).forEach(key => {
      if (key !== null) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/posts', formData);

  }
}

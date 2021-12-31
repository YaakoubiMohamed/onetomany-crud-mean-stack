import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  Post:any = [];

  constructor(private postService: PostService) { 
    this.readPost();
  }

  ngOnInit() {}

  readPost(){
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
     this.Post = data;
    })    
  }

  removePost(post, index) {
    if(window.confirm('Are you sure?')) {
        this.postService.deletePost(post._id).subscribe((data) => {
          this.Post.splice(index, 1);
        }
      )    
    }
  }

}

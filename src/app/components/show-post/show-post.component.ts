import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  
  submitted = false;
  commentForm: FormGroup;
  date = new Date();
  post: Post;
  id: string;
  comments: any;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { 
    this.mainForm();
  }

  ngOnInit() { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getPost(this.id);
  }
  mainForm() {
    this.commentForm = this.fb.group({
      username: ['', [Validators.required]],
      text: ['', [Validators.required]],
      createdAt: [this.date],
      post_id:[this.id]
    })
  }

  getPost(id) {
    this.postService.getPost(id).subscribe(data => {
      console.log(data);
      this.post = data;
      this.comments = data.comments;
      this.comments = this.comments.flat();
      console.log(this.comments);
    });
  }

  // Getter to access form control
  get myForm(){
    return this.commentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.commentForm.valid) {
      return false;
    } else {
      console.log(this.commentForm.value);
      let comment ={};
      comment['comment']= this.commentForm.value;
      comment['_id'] = this.id;
      console.log(comment);
      
      this.commentService.createComment(comment).subscribe(
        (res) => {
          console.log('Post successfully created!');
          this.getPost(this.id)
          this.commentForm.reset();
          //this.ngZone.run(() => this.router.navigateByUrl('/posts-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }


}

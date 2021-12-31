import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  submitted = false;
  postForm: FormGroup;
  date = new Date();
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private postService: PostService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.postForm = this.fb.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      createdAt: [this.date],
    })
  }

  

  // Getter to access form control
  get myForm(){
    return this.postForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.postForm.valid) {
      return false;
    } else {
      console.log(this.postForm.value);
      this.postService.createPost(this.postForm.value).subscribe(
        (res) => {
          console.log('Post successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/posts-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}

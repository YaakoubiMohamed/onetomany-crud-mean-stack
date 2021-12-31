import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  submitted = false;
  postForm: FormGroup;
  date = new Date();
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private postService: PostService
  ) { 
    this.mainForm();
  }

  ngOnInit() { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getPost(id);
  }

  getPost(id) {
    this.postService.getPost(id).subscribe(data => {
      console.log(data);
      this.postForm.setValue({
        titre: data['titre'],
        auteur: data['auteur'],
        createdAt: this.date,
      });
    });
  }

  mainForm() {
    this.postForm = this.fb.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]],
      createdAt: [this.date, [Validators.required]],      
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

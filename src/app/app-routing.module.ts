import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { ShowPostComponent } from './components/show-post/show-post.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-post' },
  { path: 'create-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'show-post/:id', component: ShowPostComponent },
  { path: 'posts-list', component: PostsComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

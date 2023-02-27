import { Component, OnInit } from '@angular/core';
import { IBlog, IUser } from '../interfaces/blog.interface';
import { BlogService } from '../service/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public blogs!: IBlog[];
  public users!: IUser[];

  public userName!: string;
  public email!: string;
  public password!: string;
  public blogID = 1;
  public userID = 1;
  public editID!: number;


  public headerSign = true;
  public headerProfile = false;
  public openModal = false;
  public modalSignIn = false;
  public modalSignUp = false;
  public modalAddPost = false;
  public modalEditPost = false;
  public topic!: string;
  public message = '';
  public name!: string;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getUsers();
  }

  getBlog(): void {
    this.blogs = this.blogService.getBlogs();
  }
  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  signIn(): void {
    this.reset();
    this.modalSignUp = false;
    this.modalSignIn = true;
  }
  signUp(): void {
    this.reset();
    this.modalSignIn = false;
    this.modalSignUp = true;
  }

  submitSignIn(): void {
    for (let user of this.users) {
      if (this.email == user.email && this.password == user.password) {
        this.name = user.userName;
        this.modalSignIn = false;
        this.headerSign = false;
        this.headerProfile = true;
        this.openModal = false;
      }
    }
  }
  submitSignUp(): void {
    let arrUser = this.users.map(user => user.userName).includes(this.userName);
    let arrEmail = this.users.map(user => user.email).includes(this.email);
    if (!arrUser && !arrEmail) {
      this.userID += 1;
      let profile = {
        id: this.userID,
        userName: this.userName,
        email: this.email,
        password: this.password
      }
      this.blogService.addUser(profile);
      this.reset();
      this.openModal = false;
    } else {
      alert('This user has already added')
    }
  }

  openAddPost(): void {
    this.openModal = true;
    this.modalAddPost = true;
  }
  addPost(): void {
    if (this.message != '') {
      this.blogID += 1;
      let post = {
        id: this.blogID,
        topic: this.topic,
        postedBy: this.name,
        date: this.blogService.createAt,
        message: this.message
      }
      this.blogService.addBlog(post);

      this.openModal = false;
      this.modalAddPost = false;
      this.topic = '';
      this.message = '';
      console.log(this.blogService.getBlogs());
    } else {
      alert('Please, write text on form below')
    }
  }
  savePost(): void {
    let post = {
      id: this.blogID,
      topic: this.topic,
      postedBy: this.name,
      date: this.blogService.createAt,
      message: this.message
    }
    if (this.message != '') {
      this.blogService.updateBlog(post, this.blogID);
      this.openModal = false;
      this.modalEditPost = false;
    } else {
      alert('Please, write text on form below')
    }
  }

  signOut(): void {
    this.headerProfile = false;
    this.headerSign = true;
    this.name = '';
  }

  editPost(blog: IBlog): void {
    this.openModal = true;
    this.modalEditPost = true;
    this.topic = blog.topic;
    this.message = blog.message;
    this.editID = blog.id;
  }
  deletePost(blog: IBlog): void {
    this.blogService.deleteBlog(blog.postedBy);
  }

  reset(): void {
    this.userName = ''
    this.email = '';
    this.password = '';
    this.openModal = true;
  }
  closeModal(): void {
    this.openModal = false;
  }

}

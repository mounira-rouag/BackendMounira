import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = true;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loading:boolean=true;
  messages!: Message[] ;

  constructor(private authService: UserServiceService, private storageService: StorageService, private router: Router) { }
   // Define errorMessage property here
  ngOnInit(): void {
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'Bad credentil' }];
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    this.loading=true;
    const { username, password } = this.form;

    this.authService.signIn(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        
        this.isLoggedIn = true;
        
        this.roles = this.storageService.getUser().roles;
       
       
        // Navigate to the profile page instead of reloading
      this.router.navigate(['/profil']);
      this.loading=false;
      },
      error: err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
       
      }
    });
  }

/** 
  
  constructor(private authService: UserServiceService, private router: Router) { }
  
  signIn(signInFormData: any): void {
    const { username, password } = signInFormData;
    this.authService.signIn(username, password)
      .subscribe(
        response => {
          console.log('Sign-in successful:', response);
          // Handle success response, e.g., redirect to dashboard
          this.errorMessage = '';
          this.router.navigateByUrl('/');
        },
        error => {
          this.errorMessage = error.error.message; 
        }
      );
   
  }
*/
}

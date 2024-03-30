import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifiyemail',
  templateUrl: './verifiyemail.component.html',
  styleUrls: ['./verifiyemail.component.css']
})
export class VerifiyemailComponent {
  errorMessage: string='';
  sucessMessage: string='';
  isSuccessful:boolean=false;
  isFailed:boolean=false;
  loading = false;


  constructor(private userService: UserServiceService) { }
  verifyEmail(email: string): void {
    this.loading = true;

    this.userService.verifyEmail(email).subscribe({
        next: (response: any) => {
            if (response && response.status === 200) {
                console.log('Email exists!');
                this.isSuccessful = true;
                this.sucessMessage = response.message;
            }
            this.loading = false;
        },
        error: (error) => {
            // Handle HTTP error
            console.error('Error occurred while verifying email:', error);
            this.isFailed = true;
            this.errorMessage = error.error.message;
            this.loading = false;
        }
    });
}


  
}

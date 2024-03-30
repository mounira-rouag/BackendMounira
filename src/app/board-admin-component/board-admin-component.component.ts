import { Component } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-board-admin-component',
  templateUrl: './board-admin-component.component.html',
  styleUrls: ['./board-admin-component.component.css']
})
export class BoardAdminComponentComponent {
  content?: string;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

}

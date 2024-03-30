import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';
import { User } from '../Models/User.model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  allUsers: User[] = [];
  loading: boolean = true;

  first = 0;
  rows = 10;
  selectedRoles: string[] = [];
  siteid!: string;
  visible: boolean = false;
  errorMessage = '';
roles:string[]=[];


  userToUpdate :any

  showDialog(data : any) {
    this.userToUpdate = data
    console.log(data);
    
    this.visible = true;
  }
 

  closeDialog() {
    this.visible = false;
  }

  editUser(){
    this.userToUpdate.roles=this.selectedRoles;
    this.userService.updateUser(this.userToUpdate.id, this.userToUpdate)
    .subscribe(
      () => {
        // Handle success
        console.log('User updated successfully');
        // Optionally, you can navigate to another page or show a success message
      },
      (error) => {
        // Handle error
        console.error('Failed to update user:', error);
        this.errorMessage = 'Failed to update user';
      }
    );
  }


  constructor(private userService: UserServiceService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
   this.getAllUser()
  }



  getAllUser() {
    this.loading=true;
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res
      console.log(this.allUsers, "eeeeeeeeee");
      this.loading = false;
    })
  }
  updateUser(userId: number, updatedUser: any): void {
    // Call the user service to update the user
    this.userService.updateUser(userId, updatedUser)
      .subscribe(
        () => {
          // Handle success
          console.log('User updated successfully');
          // Optionally, you can navigate to another page or show a success message
        },
        (error) => {
          // Handle error
          console.error('Failed to update user:', error);
          this.errorMessage = 'Failed to update user';
        }
      );
  }


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.allUsers ? this.first === this.allUsers.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.allUsers ? this.first === 0 : true;
  }
}

import { Component } from '@angular/core';
import { UserServiceService } from './Services/user-service.service';
import { StorageService } from './Services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  title = 'PfeProject';
  tokenStorageService: any;
  roles: any;
  showAdminBoard: any;
  username: any;
  showModeratorBoard: any;

  constructor(private userService: UserServiceService,tokenStorageService: StorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();

   
  }
}

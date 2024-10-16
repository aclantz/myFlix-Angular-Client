import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { Router } from '@angular/router';
//Material
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  User: any = {}//empty value to hold data from local storage

  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) {}
  ngOnInit(): void {
    this.User = this.getUserInfo();
  }

  /**
   * Update User dialog
   * @returns UpdateUserFormComponent 
   */
  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, {
      width: '280px',
    });
  }

  /**
   * Get User data function
   * @remarks get user data from localStorage and parse JSON
   * @returns {object} userInfo, all user data
   */
  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || " ");
    console.log('getUserInfo return ->', userInfo);
    return userInfo
  }


  /**
   * User Logout
   * Nav Function
   */
  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
  /**
   * Movie route
   * Nav function
   */
  movieRoute(): void {
    this.router.navigate(['movies']);
  }
}

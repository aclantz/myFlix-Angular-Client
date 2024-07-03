import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { Router } from '@angular/router';
//Material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  constructor(public dialog: MatDialog, public router: Router) { }
  ngOnInit(): void {
  }

  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, {
      width: '280px'
    });
  }

  getUserInfo = () => {
    let userInfo = localStorage.getItem( JSON.parse('userInfo') )
    console.log('getUserInfo return ->', userInfo)
    return userInfo
  }
  public User = this.getUserInfo()
  
  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }

  movieRoute(): void {
    this.router.navigate(["movies"]);
  }

}

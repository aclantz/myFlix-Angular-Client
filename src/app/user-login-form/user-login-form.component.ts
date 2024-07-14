import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// Routing
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit{
  @Input() userData = { username: '', password: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) {}

ngOnInit(): void {
}

/**
 * Login Function
 * fetchApiData.userLogin
 * @remarks send form inputs to backend and confirm login
 * @param {object} this.userData
 * @return {object} user, stored as userInfo
 * @return {string} token
 * @return {string} user.username. stored as user
 */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', result.user.username);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userInfo', JSON.stringify(result.user));

     this.dialogRef.close(); // This will close the modal on success!
     console.log(result);
     this.snackBar.open('User is logged in!', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}

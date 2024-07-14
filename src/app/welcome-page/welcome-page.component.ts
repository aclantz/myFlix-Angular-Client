import { Component, OnInit } from '@angular/core';
//Components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
//Material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  
  /**
   * open Registration dialog
   * @returns UserRegistrationFormComponent
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  /**
   * open Login dialog
   * @returns UserLoginFormComponent
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
//Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.scss'
})

export class UpdateUserFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserFormComponent>,
    public snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    public user = localStorage.getItem('user')

    updateUser(): void {
      this.fetchApiData.putUserUpdate(this.userData).subscribe((result) => {

       this.dialogRef.close(); // This will close the modal on success!
       console.log(result);
       this.snackBar.open('user update successful', 'OK', {
          duration: 2000
       });
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }

}

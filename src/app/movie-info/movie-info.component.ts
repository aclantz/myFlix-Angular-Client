import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; description: string },
    public dialogRef: MatDialogRef<MovieInfoComponent>
  ) {}
}

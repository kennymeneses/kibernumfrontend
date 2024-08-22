import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-contactdialog',
  standalone: true,
  imports: [],
  templateUrl: './contactdialog.component.html',
  styleUrl: './contactdialog.component.css'
})
export class ContactdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

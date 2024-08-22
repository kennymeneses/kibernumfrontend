import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-contactdialog',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    NgIf
  ],
  templateUrl: './contactdialog.component.html',
  styleUrl: './contactdialog.component.css'
})
export class ContactdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

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
import {UpdateContactRequest} from "../../../shared/requests";
import {ApiService} from "../../../services/api.service";
import {ContactResponse} from "../../../shared/responses";

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
  apiService!: ApiService;

  constructor(
    public dialogRef: MatDialogRef<ContactdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    apiService: ApiService)
  {
    this.apiService = apiService;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    let request : UpdateContactRequest = {
      contactId :this.data.id,
      name: this.data.name,
      phoneNumber : this.data.phoneNumber
    }

    this.apiService.updateContact(request, this.data.id).subscribe((result: ContactResponse)=> {
      console.log(result);
      this.dialogRef.close();
      setTimeout(()=>{
        window.location.reload();
      }, 250)
    })
  }
}

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
import {CreateContactRequest, UpdateContactRequest} from "../../../shared/requests";
import {ApiService} from "../../../services/api.service";
import {ContactResponse, UserResponse} from "../../../shared/responses";
import {create} from "node:domain";
import {SessionService} from "../../../services/session.service";

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
  sessionService!: SessionService;
  userId! : string;
  modifyCommand! : boolean;

  constructor(
    public dialogRef: MatDialogRef<ContactdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    apiService: ApiService,
    sessionService: SessionService)
  {
    this.apiService = apiService;
    this.sessionService = sessionService;
    this.sessionService.getUser().subscribe((result : UserResponse | undefined )=> {
      this.userId = result!.uuid;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    const request : UpdateContactRequest = {
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

  create(): void {
    this.modifyCommand = true;
    console.log('POST');
    console.log(this.data);
    const request : CreateContactRequest = {
      userId : this.userId,
      name : this.data.name,
      phoneNumber : this.data.phoneNumber,
    }

    this.apiService.createContact(request).subscribe((result: ContactResponse)=> {
    console.log(result);
      setTimeout(()=>{
        window.location.reload();
      }, 250)
    })
  }
}

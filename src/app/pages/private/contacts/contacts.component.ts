import { Component } from '@angular/core';
import {ContactdialogComponent} from "../contactdialog/contactdialog.component";
import {ContactResponse, ContactsResponse, UserResponse} from "../../../shared/responses";
import {MatDialog} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {ApiService} from "../../../services/api.service";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  apiService! : ApiService;
  sessionService! : SessionService;
  user! : UserResponse;
  displayedColumns: string[] = ['id', 'name', 'phone', 'actions'];
  dataSource! : MatTableDataSource<ContactResponse>;

  contacts: ContactResponse[] = [
    { id: '3c33e9dd-2102-46f8-b795-3abb07028b7f', name: 'John Doe', phoneNumber: '123-456-7890' },
    { id: 'db7146ac-d01b-4a8a-8f9c-f3a1f58d95b9', name: 'Jane Smith', phoneNumber: '987-654-3210' }
  ];

  constructor(public dialog: MatDialog, _apiService: ApiService, _sessionService: SessionService)
  {
    this.apiService = _apiService;
    this.sessionService = _sessionService;
    this.sessionService.getUser().subscribe(user => this.user = user!);

    console.log('userID', this.user.uuid!);
    this.apiService.getContacts(this.user.uuid!).subscribe((result : ContactsResponse)=> {
      this.dataSource = new MatTableDataSource<ContactResponse>(result.results);
    });
    //this.dataSource = new MatTableDataSource<ContactResponse>(this.contacts);
  }

  addContact(): void {
    const dialogRef = this.dialog.open(ContactdialogComponent, {
      width: '250px',
      data: { name: '', email: '', phone: '' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.contacts.push({ ...result, id: this.contacts.length + 1 });
        this.dataSource.data = this.contacts;
      }
    });
  }

  editContact(contact: ContactResponse): void {
    const dialogRef = this.dialog.open(ContactdialogComponent, {
      width: '250px',
      data: { ...contact }
    });

    dialogRef.afterClosed().subscribe((result: { id: string; phoneNumber: string; name: string }) => {
      if (result) {
        const index = this.contacts.findIndex(c => c.id === result.id);
        this.contacts[index] = result;
        this.dataSource.data = this.contacts;
      }
    });
  }

  deleteContact(id: string): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.dataSource.data = this.contacts;
  }

  viewContact(contact: ContactResponse): void {
    this.dialog.open(ContactdialogComponent, {
      width: '250px',
      data: { ...contact, readonly: true }
    });
  }

}

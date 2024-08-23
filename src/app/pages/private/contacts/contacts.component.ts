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
import {CreateContactRequest} from "../../../shared/requests";

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
  displayedColumns: string[] = ['name', 'phone', 'actions'];
  dataSource! : MatTableDataSource<ContactResponse>;
  contacts: ContactResponse[] =[];

  constructor(public dialog: MatDialog, _apiService: ApiService, _sessionService: SessionService)
  {
    this.apiService = _apiService;
    this.sessionService = _sessionService;
  }

  ngAfterViewInit()
  {
    this.sessionService.getUser().subscribe(user => {
      this.user = user!

      this.apiService.getContacts(user!.uuid!).subscribe((result : ContactsResponse)=> {
        this.dataSource = new MatTableDataSource<ContactResponse>(result.results);
        this.contacts = result.results;
      });
    });
  }

  addContact(): void {

    const dialogRef = this.dialog.open(ContactdialogComponent, {
      width: '250px',
      data: { name: '', phoneNumber: '' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let request : CreateContactRequest = {
          userId: this.user.uuid,
          name: result.name,
          phoneNumber : result.phoneNumber
        }

        this.apiService.createContact(request).subscribe((result: ContactResponse) => {
          console.log(result);
        })
        this.contacts.push({ ...result, id: this.contacts.length + 1 });
        this.dataSource.data = this.contacts;
      }
    });
  }

  editContact(contact: ContactResponse): void {
    const userId = this.user.uuid;
    const dialogRef = this.dialog.open(ContactdialogComponent, {
      width:'fit',
      data: { ...contact,  userId}
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

    this.apiService.deleteContact(id).subscribe((uuid: string) => {
      console.log(uuid);
    })
    this.dataSource.data = this.contacts;
  }

  viewContact(contact: ContactResponse): void {
    this.dialog.open(ContactdialogComponent, {
      width: '250px',
      data: { ...contact, readonly: true }
    });
  }

  updateContact(){

  }
}

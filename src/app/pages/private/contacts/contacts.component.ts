import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Contact>(this.contacts);

  contacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
  ];

  constructor(public dialog: MatDialog) {}

  addContact(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '250px',
      data: { name: '', email: '', phone: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contacts.push({ ...result, id: this.contacts.length + 1 });
        this.dataSource.data = this.contacts;
      }
    });
  }

  editContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '250px',
      data: { ...contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.contacts.findIndex(c => c.id === result.id);
        this.contacts[index] = result;
        this.dataSource.data = this.contacts;
      }
    });
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.dataSource.data = this.contacts;
  }

  viewContact(contact: Contact): void {
    this.dialog.open(ContactDialogComponent, {
      width: '250px',
      data: { ...contact, readonly: true }
    });
  }

}

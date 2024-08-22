import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from "@angular/router";
import { MatFormField} from "@angular/material/form-field";
import { MatFormFieldControl } from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardTitle,
    BrowserAnimationsModule,
    MatCardContent,
    MatCard,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() error: string | undefined;
  @Output() submitEM = new EventEmitter();

  //protected readonly error = error;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

}

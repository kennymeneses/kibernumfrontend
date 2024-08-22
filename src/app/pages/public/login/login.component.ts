import {Component, Input, Output, EventEmitter, Inject, inject} from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import { Router } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ApiService} from "../../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../../shared/requests";
import {LoginResult} from "../../../shared/responses";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  apiService!: ApiService;
  sessionService!: SessionService;

  router = inject(Router);
  http = inject(HttpClient);

  @Input() error: string | undefined;
  @Output() submitEM = new EventEmitter();

  //protected readonly error = error;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(_sessionService: SessionService)
  {
    this.sessionService = _sessionService;
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);

      const request : LoginRequest = {
        email: this.form.value.username,
        password: this.form.value.password,
      }

      this.sessionService.Access(request).then();

      // this.apiService.login(request).subscribe((result: LoginResult )=> {
      //   console.log(result);
      //   this.router.navigate(['contacts']);
      // })

    }
  }

}

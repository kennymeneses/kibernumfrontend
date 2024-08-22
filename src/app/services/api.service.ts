import {inject, Injectable} from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {LoginRequest, RegisterRequest, UpdateContactRequest} from "../shared/requests";
import {ContactResponse, ContactsResponse, LoginResult, UserResponse} from "../shared/responses";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  urlBase : string = environment.API_URL;

  public login(request: LoginRequest): Observable<LoginResult>
  {
    const url = this.urlBase + '/Auth/login';
    const body = request;

    return this.http.post<LoginResult>(url, request);
  }

  public register(request: RegisterRequest): Observable<UserResponse>
  {
    const url = this.urlBase + '/Users';
    const body = request;
    return this.http.post<UserResponse>(url, request);
  }

  public getUser(userId: string) : Observable<UserResponse>
  {
    const url = this.urlBase + '/Users/'+userId;
    return this.http.get<UserResponse>(url);
  }

  public getContact(contactId: string): Observable<ContactResponse>
  {
    const url = this.urlBase + '/Contacts/' + contactId;
    return this.http.get<ContactResponse>(url);
  }

  public getContacts(userId: string): Observable<ContactsResponse>
  {
    const url = this.urlBase + '/Contacts?UserId=' + userId;
    return this.http.get<ContactsResponse>(url);
  }

  public updateContact(request: UpdateContactRequest, userId: string): Observable<UserResponse>
  {
    const url = this.urlBase+ '/Contacts/' + userId;
    return this.http.put<UserResponse>(url, request);
  }

  public deleteContact(contactId: string): Observable<string>
  {
    const url = this.urlBase + '/Contacts/' + contactId;
    return this.http.delete<string>(url);
  }
}



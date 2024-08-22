import {Inject, Injectable} from '@angular/core';
import { CookieService, CookieOptions } from "ngx-cookie-service";
import {Router} from "@angular/router";
import { ApiService } from "./api.service";
import {LoginResult, UserResponse} from "../shared/responses";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginRequest} from "../shared/requests";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _cookieService : CookieService;
  router = Inject(Router);
  private _apiService : ApiService;
  userProfile : UserResponse | undefined;

  // @ts-ignore
  private userProfileSubject: BehaviorSubject<UserResponse | undefined> = new BehaviorSubject<UserResponse | undefined>(this.userProfile);

  constructor(cookie: CookieService, apiService : ApiService)
  {
    this._cookieService = cookie;
    this._apiService = apiService;
  }

  async Access(request : LoginRequest): Promise<void>
  {
    const cookieOptions : CookieOptions = {
      path: '/',
      expires: new Date(Date.now() + 7200000),
      domain: undefined, // Reemplaza con tu dominio
      secure: true
    };

    this._apiService.login(request).subscribe((response : LoginResult) => {
      if(response.token.length > 0)
      {
        this._cookieService.set('token', response.token);
        this._apiService.getUser(response.userId).subscribe((userResult: UserResponse) => {

          this.userProfileSubject.next(userResult);
          this.router.navigate(['/contacts']);

        })
      }
    })
  }

  isLoggedIn() : boolean
  {
    return this._cookieService.get('tkn') != undefined;
  }

  logout() : void
  {
    this._cookieService.delete('tkn');
    this.userProfileSubject.next(undefined);
    this.router.navigate(['/']);
  }

  getUser(): Observable<UserResponse | undefined>
  {
    return this.userProfileSubject.asObservable();
  }

  getToken(): string
  {
    return this._cookieService.get('tkn');
  }
}

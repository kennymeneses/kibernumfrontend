import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  cookieService : Inject(CookiesService);
}

import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {SessionService} from "../services/session.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionSvc = inject(SessionService);

  if(sessionSvc.isLoggedIn())
  {
    let clonedRequest = req;

    let token : string = sessionSvc.getToken();

    clonedRequest = clonedRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next(clonedRequest);
  }
  return next(req);
};

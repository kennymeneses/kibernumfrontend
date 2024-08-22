import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionService} from "../services/session.service";

export const authGuard: CanActivateFn = (route, state) => {

  const sessionSvc = inject(SessionService);
  const router = inject(Router);

  if(sessionSvc.isLoggedIn()){
    return true;
  }

  router.navigate(['/login']);
  return false;
};

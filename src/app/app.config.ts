import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./security/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    provideAnimations()]
};

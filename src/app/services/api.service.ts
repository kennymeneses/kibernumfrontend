import {inject, Injectable} from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  constructor() { }

  urlBase : string = environment.API_URL;
}

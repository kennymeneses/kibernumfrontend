import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SessionService} from "./services/session.service";
import {routes} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  sessionService! : SessionService;
  router = inject(Router);

  constructor(_sessionService: SessionService)
  {
    this.sessionService = _sessionService;
    console.log(this.sessionService.isLoggedIn())
  }

  logout():void{
    this.sessionService.logout();
    console.log(this.sessionService.isLoggedIn())
  }

  login():void{
    this.router.navigate(['/login']);
  }
}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedUsername!:string;

  constructor(private cookieService: CookieService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      const jsonCookie = JSON.parse(this.cookieService.get("user"));
      this.loggedUsername = jsonCookie.username;
    } else {
      this.loggedUsername = '';
    };
  }
}

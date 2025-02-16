import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private cookieService: CookieService){}

  closeSesion(){
    if(window.confirm("Estas seguro que quieres cerrar sesion?")){
      localStorage.removeItem("token");
      this.cookieService.delete("user");
      this.router.navigate(["/auth/login"]);
    }
  } 
}

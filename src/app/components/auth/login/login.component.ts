import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InfoComponent } from "../info/info.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { first } from 'rxjs';
import { RequestService } from '../../../services/request/request.service';
import { AlertCardComponent } from '../../cards/alert-card/alert-card.component';

@Component({
  selector: 'app-login',
  imports: [InfoComponent, AlertCardComponent, FormsModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentRoute!: string;
  loginForm!: FormGroup;
  requestService = inject(RequestService);
  alertMessage!: string;
  showAlert: boolean = false;

  constructor(private route :ActivatedRoute, private router: Router, private cookieService: CookieService){}

  ngOnInit(){
    this.route.url.pipe(first()).subscribe(segments => {
      this.currentRoute = segments[segments.length - 1]?.path || 'login';
    });

    this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
  }

  onSubmit(){
    this.requestService.login(this.loginForm.value).subscribe(data => {
        this.alertMessage = "Usuario logeado exitosamente";
        localStorage.setItem("token", data.token.jwt);
        this.cookieService.set("user", JSON.stringify(data.user), {path: "/", expires: new Date().getHours()+1});
        this.showAlert = true;
    }, error => {
        this.alertMessage = JSON.parse(JSON.stringify(error));
    });
  }

  onCloseAlert() {
    this.showAlert = false;
    this.router.navigateByUrl('/app/plants');
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

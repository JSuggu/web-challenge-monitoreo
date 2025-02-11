import { Component, inject } from '@angular/core';
import { InfoComponent } from "../info/info.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { first } from 'rxjs';
import { RequestService } from '../../../services/request/request.service';

@Component({
  selector: 'app-login',
  imports: [InfoComponent, FormsModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentRoute!: string;
  loginForm!: FormGroup;
  requestService = inject(RequestService);

  constructor(private route :ActivatedRoute){}

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
    this.requestService.loginEndpoint(this.loginForm.value).subscribe(data => {
        const jsonResponse = JSON.parse(JSON.stringify(data));
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

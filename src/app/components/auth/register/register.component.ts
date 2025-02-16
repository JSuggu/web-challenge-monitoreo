import { Component, inject } from '@angular/core';
import { InfoComponent } from "../info/info.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { first, timeout } from 'rxjs';
import { RequestService } from '../../../services/request/request.service';
import { AlertCardComponent } from '../../cards/alert-card/alert-card.component';


@Component({
  selector: 'app-register',
  imports: [InfoComponent, AlertCardComponent, FormsModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    currentRoute!: string;
    registerForm!: FormGroup;
    requestService = inject(RequestService);
    alertMessage!: string;
    showAlert: boolean = false;
  
    constructor(private route :ActivatedRoute, private router: Router){}
  
    ngOnInit(){
      this.route.url.pipe(first()).subscribe(segments => {
        this.currentRoute = segments[segments.length - 1].path;
      });
  
      this.registerForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        }, {validators: this.passwordMatchValidator.bind(this)});
    }

    onSubmit(){
      this.requestService.register(this.registerForm.value).subscribe(response => {
        const jsonResponse = JSON.parse(JSON.stringify(response));
        this.alertMessage = jsonResponse.message;
        this.showAlert = true;
      }, errorResponse => {
        const error = errorResponse.error;
        if(error.error == "DataIntegrityViolationException"){
          const errorMessage: string =  error.message;
          this.alertMessage = errorMessage.split("\n")[1].split("] [")[0];
        } else {
          this.alertMessage = error.message;
        }
        this.showAlert = true;
      });
    }

    onCloseAlert() {
      this.showAlert = false;
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null{
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password !== confirmPassword) return { passwordMismatch: true };

      return null;
    }

    get username() {
      return this.registerForm.get('username');
    }
    
    get email() {
      return this.registerForm.get('email');
    }
  
    get password() {
      return this.registerForm.get('password');
    }

    get confirmPassword() {
      return this.registerForm.get('confirmPassword');
    }
}

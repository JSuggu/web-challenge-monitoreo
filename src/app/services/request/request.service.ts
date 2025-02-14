import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse, Register } from '../../models/auth.interface';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  http = inject(HttpClient);
  private urlBase = "http://localhost:8080/api";
  
  registerEndpoint(registerData: Register){
    const endpoint = "/auth/register";
    return this.http.post(
      this.urlBase+endpoint,
      registerData,
      {
        headers : { 'Content-Type' : 'application/json'}
      }
    );
  }

  loginEndpoint(loginData: Login) : Observable<LoginResponse>{
    const endpoint = "/auth/login";
    return this.http.post<LoginResponse>(
      this.urlBase+endpoint,
      loginData,
      {
        headers : { 'Content-Type' : 'application/json'}
      }
    );
  }

  getPlants(token: string | null): Observable<Array<Plant>>{
    const endpoint = "/plants/admin"
    return this.http.get<Array<Plant>>(
      this.urlBase+endpoint,
      {
        headers : { 'Authorization' : `Bearer ${token}` }
      }
    )
  }


}

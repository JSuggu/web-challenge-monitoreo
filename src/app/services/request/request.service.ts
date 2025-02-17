import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse, Register } from '../../models/auth.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { Plant } from '../../models/Plant';
import { CreatePlant, UpdateSensor } from '../../models/request.interface';
import { Sensor } from '../../models/Sensor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private urlBase = /*"http://localhost:8080/api";*/ "https://api-monitoring-u70j.onrender.com/api";
  private countryApiUrl = 'https://restcountries.com/v3.1/all';
  http = inject(HttpClient);
  router = inject(Router);
  
  register(registerData: Register){
    const endpoint = "/auth/register";
    return this.http.post(
      this.urlBase+endpoint,
      registerData,
      {
        headers : { 'Content-Type' : 'application/json'}
      }
    );
  }

  login(loginData: Login) : Observable<LoginResponse>{
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
    const endpoint = "/plants/admin";
    return this.http.get<Array<Plant>>(
      this.urlBase+endpoint,
      {
        headers : { 'Authorization' : `Bearer ${token}`},
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }

      return throwError(errorResponse);
    }));
  }

  postPlant(token: string | null, newPlant: CreatePlant){
    const endpoint = "/plants/admin/save";
    return this.http.post<Plant>(
      this.urlBase+endpoint,
      newPlant,
      {
        headers : { 
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }
      return throwError(errorResponse);
    }));
  }

  addDefaultSensors(token: string | null, plantUuid: string){
    const endpoint = "/sensors/admin/default-save";
    return this.http.post<Array<Sensor>>(
      this.urlBase+endpoint,
      {
        plantUuid
      },
      {
        headers : { 
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }
      return throwError(errorResponse);
    }));
  }

  updatePlant(token: string | null, updatedPlant: CreatePlant, plantUuid:string){
    const endpoint = `/plants/admin/update/${plantUuid}`;
    return this.http.put<Plant>(
      this.urlBase+endpoint,
      updatedPlant,
      {
        headers : { 
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }
      return throwError(errorResponse);
    }));
  }

  deletePlant(token:string, plantUuid: string){
    const endpoint = `/plants/admin/delete/${plantUuid}`;
    return this.http.delete<{message:string}>(
      this.urlBase+endpoint,
      {
        headers : { 
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }
      return throwError(errorResponse);
    }));
  }

  updateSensor(token:string | null, updatedSensor: UpdateSensor ,id: number){
    const endpoint = `/sensors/admin/update/${id}`;
    return this.http.put<Sensor>(
      this.urlBase+endpoint,
      updatedSensor,
      {
        headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    ).pipe(catchError((errorResponse:HttpErrorResponse) => {
      const errorType = this.getErrorType(errorResponse);
      if(errorType.includes("Jwt")){
        this.handleTokenExpiration();
      }
      return throwError(errorResponse);
    }));
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.countryApiUrl);
  }

  private getErrorType(errorResponse:HttpErrorResponse): string{
    return errorResponse.error.error;
  }

  private handleTokenExpiration() {
    localStorage.removeItem("token");
    window.alert("El token ha expirado o no es valido");
    this.router.navigate(["/auth/login"]);
  }
}

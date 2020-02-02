import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }


  registerUser(registerData: any) {
    console.log("Leaves Data", registerData);
    const url = environment.url + 'user/' + 'signup/';
    return this._http.post(url, registerData);
  }
}

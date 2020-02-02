import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from '../../../node_modules/rxjs/operators';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { user } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentuser: Observable<user>;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentuser = this.currentUserSubject.asObservable();
    console.log('user data', JSON.parse(localStorage.getItem('currentUser')));
  }


  loginUser(loginData: any) {
    console.log("login Data", loginData);
    const url = environment.url + 'User/' + 'login/';
    return this._http.post(url, loginData)
      .pipe(map(user => {
          console.log('user data', user);
        // login successful if there's a jwt token in the response
        if (user && user['jwt']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          // console.log('user data', JSON.parse(localStorage.getItem('currentUser')));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}

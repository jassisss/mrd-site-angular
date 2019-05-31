import { Injectable } from '@angular/core';
import { UserloginModel } from '../model/userlogin-model';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth = false;

  userLogin: UserloginModel;

  constructor( private dataService: DataService ) { }

  // @ts-ignore
  onLogin(obj): Observable<UserloginModel> {

    return this.dataService.postUserLoginPhoto(obj);

  }

  isAuth() {
    return this.userAuth;
  }

  setUserAuth(user, status) {
    this.userAuth = status;
    this.userLogin = user;
    return;
  }

  getUserAuth() {
    return this.userLogin;
  }
}

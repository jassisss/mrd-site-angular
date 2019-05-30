import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth = false;

  constructor() { }

  // tslint:disable-next-line:ban-types
  onLogin(obj: Object) {
      // TODO
      console.log(obj);
      this.userAuth = true;
      return true;
  }

  isAuth() {
    return this.userAuth;
  }
}

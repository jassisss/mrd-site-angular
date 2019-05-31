import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {delay, finalize, take} from 'rxjs/operators';

import { UserModel } from '../model/user-model';
import { UserstatusModel } from '../model/userstatus-model';
import { UsertypeModel } from '../model/usertype-model';
import { ProductModel } from '../model/product-model';
import { UserphotoModel } from '../model/userphoto-model';
import { UserloginModel } from '../model/userlogin-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public subject$ = this.loadingSubject.asObservable();

  private serverUrl = 'http://localhost:8080/';

  constructor( private http: HttpClient) { }

/*
  BLOCO DE ACESSO PELO JSON-SERVER
*/
  getUsers(): Observable<UserModel[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserModel[]>(this.serverUrl + 'user')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getUser(id): Observable<UserModel[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserModel[]>(this.serverUrl + 'user/' + id)
      .pipe(take(1));
  }

  postUser(user): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.serverUrl + 'user', user)
      .pipe(take(1));
  }

  postUserLogin(user): Observable<UserloginModel> {
    return this.http.post<UserloginModel>(this.serverUrl + 'login', user)
      .pipe(take(1));
  }

  postUserLoginPhoto(user): Observable<UserloginModel> {
    return this.http.post<UserloginModel>(this.serverUrl + 'loginp', user)
      .pipe(take(1));
  }

  putUser(user): Observable<UserModel[]> {
    return this.http.put<UserModel[]>(this.serverUrl + 'user/' + user.id, user)
      .pipe(take(1));
  }

  deleteVirtualUser(id): Observable<UserModel[]> {
    return this.http.put<UserModel[]>(this.serverUrl + 'userdelete/' + id, id)
      .pipe(take(1));
  }

  delUser(id): Observable<UserModel[]> {
    return this.http.delete<UserModel[]>(this.serverUrl + 'user/' + id)
      .pipe(take(1));
  }

  getUserStatus(): Observable<UserstatusModel[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserstatusModel[]>(this.serverUrl + 'userstatus')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getUserStatusId(id): Observable<UserstatusModel[]> {
    return this.http.get<UserstatusModel[]>(this.serverUrl + 'userstatus/' + id)
      .pipe(take(1));
  }

  getUserType(): Observable<UsertypeModel[]> {
    this.loadingSubject.next(true);
    return this.http.get<UsertypeModel[]>(this.serverUrl + 'usertype')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getUserTypeId(id): Observable<UsertypeModel[]> {
    return this.http.get<UsertypeModel[]>(this.serverUrl + 'usertype/' + id)
      .pipe(take(1));
  }

  getUserPhotoByUserId(id): Observable<UserphotoModel[]> {
    return this.http.get<UserphotoModel[]>(this.serverUrl + 'userphotouser/' + id)
      .pipe(take(1));
  }

  postUserPhoto(photo): Observable<UserphotoModel[]> {
    return this.http.post<UserphotoModel[]>(this.serverUrl + 'userphoto', photo)
      .pipe(take(1));
  }

  putUserPhoto(id, photo): Observable<UserphotoModel[]> {
    return this.http.put<UserphotoModel[]>(this.serverUrl + 'userphoto/' + id, photo)
      .pipe(take(1));
  }

  getProducts(): Observable<ProductModel[]> {
    this.loadingSubject.next(true);
    return this.http.get<ProductModel[]>(this.serverUrl + 'product')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

}

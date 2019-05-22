import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {delay, finalize, take} from 'rxjs/operators';

import { ProductData } from '../model/product-data';
import { UserGeral } from '../model/user-geral';
import { UserstatusGeral } from '../model/userstatus-geral';
import { UsertipoGeral } from '../model/usertipo-geral';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public subject$ = this.loadingSubject.asObservable();

  private jsonServerUrl = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }

  getJsonUsers(): Observable<UserGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserGeral[]>(this.jsonServerUrl + 'user')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonUser(id): Observable<UserGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserGeral[]>(this.jsonServerUrl + 'user/' + id)
      .pipe(take(1));
  }

  postJsonUser(user): Observable<UserGeral[]> {
    return this.http.post<UserGeral[]>(this.jsonServerUrl + 'user', user)
      .pipe(take(1));
  }

  putJsonUser(user): Observable<UserGeral[]> {
    return this.http.put<UserGeral[]>(this.jsonServerUrl + 'user/' + user.id, user)
      .pipe(take(1));
  }

  delJsonUser(id): Observable<UserGeral[]> {
    return this.http.delete<UserGeral[]>(this.jsonServerUrl + 'usert/' + id)
      .pipe(take(1));
  }

  getJsonUserStatus(): Observable<UserstatusGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserstatusGeral[]>(this.jsonServerUrl + 'userstatus')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonUserStatusId(id): Observable<UserstatusGeral[]> {
    return this.http.get<UserstatusGeral[]>(this.jsonServerUrl + 'userstatus/' + id)
      .pipe(take(1));
  }

  getJsonUserTipo(): Observable<UsertipoGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UsertipoGeral[]>(this.jsonServerUrl + 'usertipo')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonUserTipoId(id): Observable<UsertipoGeral[]> {
    return this.http.get<UsertipoGeral[]>(this.jsonServerUrl + 'usertipo/' + id)
      .pipe(take(1));
  }

  getJsonProducts(): Observable<ProductData[]> {
    this.loadingSubject.next(true);
    return this.http.get<ProductData[]>(this.jsonServerUrl + 'product')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

}

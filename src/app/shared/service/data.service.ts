import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

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
        delay(500),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonUserStatus(): Observable<UserstatusGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UserstatusGeral[]>(this.jsonServerUrl + 'userstatus')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonUserTipo(): Observable<UsertipoGeral[]> {
    this.loadingSubject.next(true);
    return this.http.get<UsertipoGeral[]>(this.jsonServerUrl + 'usertipo')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonProducts(): Observable<ProductData[]> {
    this.loadingSubject.next(true);
    return this.http.get<ProductData[]>(this.jsonServerUrl + 'product')
      .pipe(
        delay(0),
        finalize(() => this.loadingSubject.next(false)));
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { UserData } from '../model/user-data';
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
        delay(1000),
        finalize(() => this.loadingSubject.next(false)));
  }

  getJsonProducts(): Observable<ProductData[]> {
    this.loadingSubject.next(true);
    return this.http.get<ProductData[]>(this.jsonServerUrl + 'product')
      .pipe(
        delay(1000),
        finalize(() => this.loadingSubject.next(false)));
  }

  getUsers() {
    return this.http.get<UserData[]>('assets/data/user-data.json');
  }

  // noinspection JSUnusedGlobalSymbols
  getUsersGeral() {
    return this.http.get<UserGeral[]>('assets/data/user-geral.json');
  }

  // noinspection JSUnusedGlobalSymbols
  getUserStatus() {
    return this.http.get<UserstatusGeral[]>('assets/data/userstatus-geral.json');
  }
  // noinspection JSUnusedGlobalSymbols
  getUserTipo() {
    return this.http.get<UsertipoGeral[]>('assets/data/usertipo-geral.json');
  }
  // noinspection JSUnusedGlobalSymbols
  getProducts() {
    return this.http.get<ProductData[]>('assets/data/product-data.json');
  }

}

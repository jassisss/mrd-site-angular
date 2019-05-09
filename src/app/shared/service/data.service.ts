import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../model/user-data';
import { ProductData } from '../model/product-data';
import {UserGeral} from '../model/user-geral';
import {UserstatusGeral} from '../model/userstatus-geral';
import {UsertipoGeral} from '../model/usertipo-geral';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jsonServerUrl = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }

  getJsonUsers() {
    return this.http.get<UserGeral[]>(this.jsonServerUrl + 'user');
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

  getJsonProducts() {
    return this.http.get<ProductData[]>(this.jsonServerUrl + 'product');
  }

}

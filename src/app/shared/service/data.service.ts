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

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<UserData[]>('assets/data/user-data.json');
  }

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

  getProducts() {
    return this.http.get<ProductData[]>('assets/data/product-data.json');
  }

}

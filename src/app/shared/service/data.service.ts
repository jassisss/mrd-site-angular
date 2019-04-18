import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../model/user-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<UserData[]>('assets/data/user-data.json');
  }

}

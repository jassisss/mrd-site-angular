import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserloginModel } from '../shared/model/userlogin-model';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  userAuth: UserloginModel;
  src: string | ArrayBuffer = '../../../../assets/img/avatar-menino-01.png';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.userAuth = this.authService.getUserAuth();

    const buffer = window.atob(this.userAuth.photo);
    console.log(buffer);
    this.src = buffer;
  }

  onLogoff() {

    this.authService.setUserAuth(null, false);
    this.router.navigate(['/login']);

  }

  ngOnDestroy() {

    this.authService.setUserAuth(null, false);
    this.router.navigate(['/login']);

  }

}

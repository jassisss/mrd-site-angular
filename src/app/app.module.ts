import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DataService } from './shared/service/data.service';
import { AuthService } from './shared/service/auth.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule} from '@angular/material';
import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';

@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    MainModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    LyThemeModule.setTheme('minima-dark')
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuard,
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

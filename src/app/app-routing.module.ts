import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { PasswordResetComponent } from './shared/component/password-reset/password-reset.component';

const appRoutes: Routes = [
  {path: 'password', component: PasswordResetComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
 ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

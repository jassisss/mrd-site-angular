import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/component/admin/admin.component';
import {MainComponent} from './main/component/main/main.component';

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'main', component: MainComponent},
  {path: '', component: AdminComponent},
  {path: '**', component: AdminComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

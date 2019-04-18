import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
// import { Erro404Component } from './shared/component/erro404/erro404.component';

// @ts-ignore
const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'table', component: TableComponent},
  {path: '', redirectTo: 'admin', pathMatch: 'full'}
  /*,
  {path: '**', component: Erro404Component}*/
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

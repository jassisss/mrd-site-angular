import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { Erro404Component } from '../shared/component/erro404/erro404.component';

const routesAdmin: Routes = [
  {path: 'admin', component: AdminComponent, children: [
      {path: 'controle', component: ControleComponent},
      {path: 'user', component: UserComponent},
      {path: 'product', component: ProductComponent},
    ]},
  {path: '**', component: Erro404Component}
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

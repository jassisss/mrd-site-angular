import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/user.component';
import { TesteComponent } from './teste/teste.component';

const routesAdmin: Routes = [
  {path: 'admin', component: AdminComponent, children: [
      {path: 'controle', component: ControleComponent},
      {path: 'user', component: UserComponent},
      {path: 'teste', component: TesteComponent},
    ]},
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

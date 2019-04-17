import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { TesteComponent } from './teste/teste.component';

const routesAdmin: Routes = [
  {path: 'admin', component: TesteComponent},
  {path: 'teste', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

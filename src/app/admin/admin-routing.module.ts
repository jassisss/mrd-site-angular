import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ControleComponent } from './controle/controle.component';
import { UserComponent } from './user/components/list/user.component';
import { ProductComponent } from './product/product.component';
import { ReadingComponent } from './reading/reading.component';
import { Erro404Component } from '../shared/component/erro404/erro404.component';
import { FormComponent } from './user/components/form/form.component';
import { ViewComponent } from './user/components/view/view.component';
import { EditComponent } from './user/components/edit/edit.component';
import { PasswordResetComponent } from '../shared/component/password-reset/password-reset.component';

const routesAdmin: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: 'user', component: UserComponent},
      {path: 'user/novo', component: FormComponent},
      {path: 'user/editar/:id', component: EditComponent},
      {path: 'user/view/:id', component: ViewComponent},
      {path: 'controle', component: ControleComponent},
      {path: 'product', component: ProductComponent},
      {path: 'password', component: PasswordResetComponent},
      {path: 'reading', component: ReadingComponent}
    ]},
  {path: '**', component: Erro404Component}
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

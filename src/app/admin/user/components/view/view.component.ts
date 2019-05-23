import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserGeral } from '../../../../shared/model/user-geral';
import { DataService } from '../../../../shared/service/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: UserGeral[];

  userView = [];

  constructor( private dataService: DataService,
               private route: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        const user$ = this.dataService.getUser(id);
        user$.subscribe(user => {
          // @ts-ignore
          this.dataService.getUserStatusId(user.user_status_id)
            .subscribe(
              dados => {
                this.onLoadStatus(dados);
              });
          // @ts-ignore
          this.dataService.getUserTypeId(user.user_type_id)
            .subscribe(
              dados => {
                this.onLoadTipo(dados);
              });
          this.onLoadView(user);
        });
      });

  }

  onLoadView(user) {
    // @ts-ignore
    this.userView.id = user.id;
    // @ts-ignore
    this.userView.nome = user.name;
    // @ts-ignore
    this.userView.email = user.email;
    // @ts-ignore
    this.userView.data = user.date_create;
  }

  onLoadTipo(tipo) {
    // @ts-ignore
    this.userView.tipo = tipo.name;
  }

  onLoadStatus(status) {
    // @ts-ignore
    this.userView.status = status.name;
  }

  onEdit(e) {
    e.stopPropagation();
    // noinspection JSIgnoredPromiseFromCall
    // @ts-ignore
    this.router.navigate(['/admin/user/editar/', this.userView.id]);
  }

}

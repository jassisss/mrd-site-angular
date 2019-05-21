import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserGeral} from '../../../../shared/model/user-geral';
import {DataService} from '../../../../shared/service/data.service';

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
        const user$ = this.dataService.getJsonUser(id);
        user$.subscribe(user => {
          // @ts-ignore
          this.dataService.getJsonUserStatusId(user.userstatus_id)
            .subscribe(
              dados => {
                this.onLoadStatus(dados);
              });
          // @ts-ignore
          this.dataService.getJsonUserTipoId(user.usertipo_id)
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
    this.userView.nome = user.full_name;
    // @ts-ignore
    this.userView.email = user.email;
    // @ts-ignore
    this.userView.data = user.date_created;
  }

  onLoadTipo(tipo) {
    // @ts-ignore
    this.userView.tipo = tipo.nome;
  }

  onLoadStatus(status) {
    // @ts-ignore
    this.userView.status = status.nome;
  }

  onEdit(e) {
    e.stopPropagation();
    // noinspection JSIgnoredPromiseFromCall
    // @ts-ignore
    this.router.navigate(['/admin/user/editar/', this.userView.id]);
  }

}

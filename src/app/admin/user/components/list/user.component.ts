import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import * as $ from 'jquery';

import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../../../shared/service/data.service';
import { UserGeral } from '../../../../shared/model/user-geral';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends MatPaginatorIntl implements OnInit, OnDestroy {

  itemsPerPageLabel = '';
  nextPageLabel     = '';
  previousPageLabel = '';

  users: UserGeral[];

  error$ = new BehaviorSubject<boolean>(false);

  subs: Subscription;

  tableButtonsHide = false;

  columnsToDisplay: string[] = ['radio', 'full_name', 'email', 'date_created'];

 // dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  dataSource: MatTableDataSource<UserGeral>;

  loading$ = this.dataService.subject$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {
    super();
    this.nextPageLabel = '  próxima';
    this.previousPageLabel = ' anterior';
    this.itemsPerPageLabel = 'número de páginas';

  }

  ngOnInit() {

    this.onRefresh();

  }

  onRefresh() {

    this.tableButtonsHide = false;
    const botao = $('.table-disabled');
    const filtro = $('.filter');
    filtro.val('');
    botao.attr('disabled', 'disabled');

    this.subs = this.dataService.getJsonUsers()
      .subscribe(
        dados => {
          this.users = dados;
          this.dataSource = new MatTableDataSource(dados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          botao.attr('enabled', 'enabled');
        },
        error => {
          console.log(error);
          this.error$.next(true);
          return of();
        });

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onRowClicked(e, linha) {
    e.stopPropagation();
    this.tableButtonsHide = true;
    console.log(linha);
  }

  // noinspection UnterminatedStatementJS
  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onTableClick(e: MouseEvent, row) {
    e.stopPropagation();
    console.log(row);
  }

}

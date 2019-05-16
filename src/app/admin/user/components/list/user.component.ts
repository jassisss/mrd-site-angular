import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource } from '@angular/material';

import * as $ from 'jquery';
import { DataService } from '../../../../shared/service/data.service';
import { UserGeral } from '../../../../shared/model/user-geral';
import { ErrorDialogComponent } from '../../../../shared/component/error-dialog/error-dialog.component';

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

  subs: Subscription[] = [];

  tableButtonsHide = false;

  columnsToDisplay: string[] = ['radio', 'full_name', 'email', 'date_created'];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isTablet$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches)
    );
 // dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  dataSource: MatTableDataSource<UserGeral>;

  loading$ = this.dataService.subject$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              public dialog: MatDialog) {
    super();
    this.nextPageLabel = '  próxima';
    this.previousPageLabel = ' anterior';
    this.itemsPerPageLabel = 'número de páginas';

  }

  ngOnInit() {

    this.onRefresh();

    this.subs.push(this.isHandset$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'email'];
        } else {
          this.columnsToDisplay = ['radio', 'full_name', 'email', 'date_created'];
        }
      }
    ));

    this.subs.push(this.isTablet$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'email', 'date_created'];
        } else {
          this.columnsToDisplay = ['radio', 'full_name', 'email', 'date_created'];
        }
      }
    ));

  }

  onRefresh() {

    this.tableButtonsHide = false;
    const botao = $('.table-disabled');
    const filtro = $('.filter');
    filtro.val('');
    botao.attr('disabled', 'disabled');
    this.error$.next(false);

    this.subs.push(this.dataService.getJsonUsers()
      .subscribe(
        dados => {
          this.users = dados;
          this.dataSource = new MatTableDataSource(dados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          botao.attr('enabled', 'enabled');
        },
        error => {
          this.error$.next(true);
          this.dataSource = null;
          this.openDialog();
          return of();
        }));

  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
  }

  onRowClicked(e, linha) {
    e.stopPropagation();
    this.tableButtonsHide = true;
    console.log(linha.id);
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
    console.log(row.id);
    this.router.navigate(['/admin/user/view/1']);
  }

  openDialog() {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'ERRO',
        message: 'Erro ao carregar tabela de usuários. Tente mais tarde...',
        type: 'error'
      }
    });
  }
}

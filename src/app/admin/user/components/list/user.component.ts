import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource } from '@angular/material';

import * as $ from 'jquery';
import { DataService } from '../../../../shared/service/data.service';
import { ErrorDialogComponent } from '../../../../shared/component/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/component/confirm-dialog/confirm-dialog.component';
import { UserModel } from '../../../../shared/model/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends MatPaginatorIntl implements OnInit, OnDestroy {

  itemsPerPageLabel = '';
  nextPageLabel     = '';
  previousPageLabel = '';

  users: UserModel[];

  rowId: number;
  rowEmail: string;

  error$ = new BehaviorSubject<boolean>(false);

  subs: Subscription[] = [];

  tableButtonsHide = false;

  columnsToDisplay: string[] = ['radio', 'name', 'email', 'date_create', 'date_update'];

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

  dataSource: MatTableDataSource<UserModel>;

  loading$ = this.dataService.subject$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              private dialog: MatDialog) {
    super();
    this.nextPageLabel = '  próxima';
    this.previousPageLabel = ' anterior';
    this.itemsPerPageLabel = 'número de páginas';
  }

  ngOnInit() {

    this.subs.push(this.isHandset$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'email'];
        } else {
          this.columnsToDisplay = ['radio', 'name', 'email', 'date_create', 'date_update'];
        }
      }
    ));

    this.subs.push(this.isTablet$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'email', 'date_create', 'date_update'];
        } else {
          this.columnsToDisplay = ['radio', 'name', 'email', 'date_create', 'date_update'];
        }
      }
    ));

    this.onRefresh();

  }

  onRefresh() {

    this.tableButtonsHide = false;
    const habilita = $('.table-disabled');
    const filtro = $('.filter');
    filtro.val('');
    habilita.attr('disabled', 'disabled');
    this.error$.next(false);

    this.subs.push(this.dataService.getUsers()
      .subscribe(
        dados => {
          this.users = dados;
          this.dataSource = new MatTableDataSource(dados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          habilita.attr('enabled', 'enabled');
        },
        error => {
          this.error$.next(true);
          this.dataSource = null;
          // const mens = 'Erro ao carregar tabela de usuários. Tente mais tarde...';
          const mens = `Erro - ${error.error.message}.`;
          this.openDialog(mens, error.error.code);
          return of();
        }));

    $('body,html').animate({
      scrollTop: 0
    }, 800);

  }

  onEdit(e) {
    e.stopPropagation();
    this.router.navigate(['/admin/user/editar/', this.rowId]);
  }

  onView(e) {
    e.stopPropagation();
    this.router.navigate(['/admin/user/view/', this.rowId]);
  }

  onDelete(e) {
    e.stopPropagation();
    const msg = `Confirma a exclusão do usuário "${this.rowEmail}"?`;
    this.openConfirmDialog(msg, 'warn');
  }

  onConfirmDelete() {
        this.dataService.deleteVirtualUser(this.rowId).subscribe(
          success => this.onRefresh(),
          error => {
            const mens = `Erro ao tentar excluir o usuários "${this.rowEmail}"`;
            this.openDialog(mens, error.status);
          }
        );
  }

  onTableClick(e: MouseEvent, row) {
    e.stopPropagation();
    this.rowId = row.id;
    this.rowEmail = row.email;
    this.onView(e);
  }

  onRowClicked(e, linha) {
    e.stopPropagation();
    this.tableButtonsHide = true;
    this.rowId = linha.id;
    this.rowEmail = linha.email;
  }

  ngOnDestroy() {
    this.subs.forEach(s =>  s.unsubscribe());
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

  openDialog(mens, status) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: `ERRO ${status}`,
        message: mens,
        type: 'error'
      }
    });
  }

  openConfirmDialog(mens, status) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'CONFIRMAR EXCLUSÃO',
        message: mens,
        type: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onConfirmDelete();
      }
    });
  }

}

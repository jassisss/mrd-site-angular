import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { SelectionModel} from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';

import { DataService } from '../../shared/service/data.service';
import { ProductData } from '../../shared/model/product-data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends MatPaginatorIntl implements OnInit, OnDestroy {

  itemsPerPageLabel = 'número de páginas';
  nextPageLabel     = '  próxima';
  previousPageLabel = ' anterior';

  products: ProductData[];

  dataSource: MatTableDataSource<ProductData>;

  subs: Subscription;

  subsHandSet: Subscription;

  subsTablet: Subscription;


  error$ = new BehaviorSubject<boolean>(false);

  loading$ = this.dataService.subject$;

  tableButtonsHide = false;

  columnsToDisplay: string[] = ['radio', 'product', 'cost_price', 'date_create'];

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

  selection = new SelectionModel<ProductData>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit() {

    const toTopo = $('#scrollPage');

    const div = document.getElementById('elem');
    const rect = div.getBoundingClientRect();

    toTopo.hide();

    toTopo.click((e) => {
      e.stopPropagation();
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    $(window).scroll(function() {

      if (($(this).height() + $(this).scrollTop() - div.scrollHeight) > -60) {
        toTopo.removeClass('to-bottom');
        toTopo.addClass('to-top');
      } else {
        toTopo.removeClass('to-top');
        toTopo.addClass('to-bottom');
      }

      if ($(this).scrollTop() > 100) {
        toTopo.fadeIn();
      } else {
        toTopo.fadeOut();
      }

    });

    this.onRefresh();

    this.subsHandSet = this.isHandset$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'product'];
        } else {
          this.columnsToDisplay = ['radio', 'product', 'cost_price', 'date_create'];
        }
      }
    );

    this.subsTablet = this.isTablet$.subscribe(result  => {
        if (result) {
          this.columnsToDisplay = ['radio', 'product', 'date_create'];
        } else {
          this.columnsToDisplay = ['radio', 'product', 'cost_price', 'date_create'];
        }
      }
    );

  }

  onRefresh() {

    this.tableButtonsHide = false;
    const botao = $('.table-disabled');
    botao.attr('disabled', 'disabled');
    const filtro = $('.filter');
    filtro.val('');
    this.subs = this.dataService.getJsonProducts()
      .subscribe(
        dados => {
          this.products = dados;
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
    this.subsHandSet.unsubscribe();
    this.subsTablet.unsubscribe();
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

}

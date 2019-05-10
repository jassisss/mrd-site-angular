import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

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

  loading$ = this.dataService.subject$;

  tableButtonsHide = true;

  columnsToDisplay: string[] = ['radio', 'product', 'cost_price', 'date_create'];

  selection = new SelectionModel<ProductData>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private dataService: DataService) {
    super();
  }

  ngOnInit() {
    this.subs = this.dataService.getJsonProducts().subscribe(dados => {
      this.products = dados;
      this.dataSource = new MatTableDataSource(dados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onRowClicked(e, linha) {
    e.stopPropagation();
    this.tableButtonsHide = false;
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
/*

export class ProductDataSource extends MatTableDataSource<ProductData> {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private paginator: MatPaginator, private sort: MatSort, private dataService: DataService) {
    super();
  }
  // @ts-ignore
  connect(): Observable<ProductData[]> {
    return this.dataService.getJsonProducts();
  }
  disconnect() {}
}
*/

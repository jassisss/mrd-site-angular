import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { UserData } from '../../shared/model/user-data';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-periodict',
  templateUrl: './periodict.component.html',
  styleUrls: ['./periodict.component.scss']
})
export class PeriodictComponent implements OnInit {

  dataSource: UserData[] = [];
  /** Columns displayed in the start. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'name'];


  selection = new SelectionModel<UserData>(false, []);

  constructor( private dataService: DataService) {
    this.selection.clear();
//    this.dataSource.forEach(row => this.selection.selected = 'deselect');
  }

  ngOnInit() {

    this.dataService.getUsers().subscribe(dados => {
      this.dataSource = dados;
    });

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected == numRows;
  }

}

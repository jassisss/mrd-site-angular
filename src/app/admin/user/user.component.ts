import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../shared/service/data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserData} from '../../shared/model/user-data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: UserData[];

  columnsToDisplay: string[] = ['id', 'name', 'email', 'registered'];

  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {

    this.dataService.getUsers().subscribe(dados => this.users = dados);

  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const ELEMENT_DATA: UserData[] = [
  {
    id: 1,
    login: 'admin',
    password: '$P$B8hZaQGcRo1gL9Tc0S7xjtMcroiTpN0',
    nicename: 'admin',
    email: 'suporte@mrdgames.com.br',
    url: '',
    registered: '2018-07-18 18:13:25',
    key: '',
    status: '0',
    name: 'admin'
  },
  {
    id: 2,
    login: 'joaolinda',
    password: '$P$BRktM6nyBNkiJLuhTNdcxjFljnYVXa/',
    nicename: 'joaolinda',
    email: 'joaoalbuquerque1993@gmail.com',
    url: '',
    registered: '2018-08-02 17:28:58',
    key: '1533230938:$P$Brj3.XG3Gv1Lcuw6ujpt6NyFiTjWl7.',
    status: '0',
    name: 'João Albuquerque'
  },
  {
    id: 3,
    login: 'jhoane',
    password: '$P$BiuWOCVHP.XyFZEVKXB37FsJw50jNz1',
    nicename: 'jhoane',
    email: 'jhoanealexssandra@hotmail.com',
    url: '',
    registered: '2018-08-24 16:34:21',
    key: '1535128462:$P$BjG.qsy1iZycghvmXIwLDa/U5XfW4b0',
    status: '0',
    name: 'Jhoane Alexssandra dos Santos Alves'
  },
  {
    id: 4,
    login: 'bia_gatinha',
    password: '$P$BR05W4PBJ8xzJ75dyWjer2E7D.xqzU1',
    nicename: 'bia_gatinha',
    email: 'biajandre@hotmail.com',
    url: '',
    registered: '2018-08-30 13:19:38',
    key: '1535635178:$P$B4IN3wWTNAx0XM4kzc8y.n1p2WdE5S.',
    status: '0',
    name: 'Beatriz Jandre'
  },
  {
    id: 5,
    login: 'jassis',
    password: '$P$BR05W4PBJ8xzJ75dyWjer2E7D.xqzU1',
    nicename: 'JAssis',
    email: 'jassis@hotmail.com',
    url: '',
    registered: '2018-08-30 13:19:38',
    key: '1535635178:$P$B4IN3wWTNAx0XM4kzc8y.n1p2WdE5S.',
    status: '0',
    name: 'José de Assis'
  },
  {
    id: 6,
    login: 'carlos',
    password: '$P$BR05W4PBJ8xzJ75dyWjer2E7D.xqzU1',
    nicename: 'Carlão',
    email: 'carlao@hotmail.com',
    url: '',
    registered: '2018-08-30 13:19:38',
    key: '1535635178:$P$B4IN3wWTNAx0XM4kzc8y.n1p2WdE5S.',
    status: '0',
    name: 'Carlos Silva'
  },
  {
    id: 7,
    login: 'silvia',
    password: '$P$BR05W4PBJ8xzJ75dyWjer2E7D.xqzU1',
    nicename: 'silvia',
    email: 'silvia@hotmail.com',
    url: '',
    registered: '2018-08-30 13:19:38',
    key: '1535635178:$P$B4IN3wWTNAx0XM4kzc8y.n1p2WdE5S.',
    status: '0',
    name: 'Silvia Silva'
  }
];

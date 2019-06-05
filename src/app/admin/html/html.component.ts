import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {

  name = 'Raimundo Silva';
  email = 'contato@ibist.org.br';
  token = '694c221ef86d6a044c07f0b73d9474bf';

  constructor() { }

  ngOnInit() {
  }

}

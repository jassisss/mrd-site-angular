import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.flipbook').turn({gradients: true, acceleration: true});
  }

}

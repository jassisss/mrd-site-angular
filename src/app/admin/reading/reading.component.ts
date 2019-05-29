import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    // Create the flipbook
    $('.flipbook').turn({
      // Width
      width:922,
      // Height
      height:600,
      // Elevation
      elevation: 50,
      // Enable gradients
      gradients: true,
      // Auto center this flipbook
      autoCenter: true
    });

  }

}

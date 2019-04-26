import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(function() {

      $('.toggle-nav').click(function (e) {
        e.stopPropagation();
        toggleNav();
      });

      function toggleNav() {

        // tslint:disable-next-line:no-unused-expression
        var btnlock = $('.btn-lock>i');

        if ($('#wrapper').hasClass('show-nav')) {
          btnlock.removeClass('fa-unlock');
          btnlock.addClass('fa-lock');
          $('#wrapper').removeClass('show-nav');
        } else {
          btnlock.removeClass('fa-lock');
          btnlock.addClass('fa-unlock');
          $('#wrapper').addClass('show-nav');
        }
      }

    });
  }

}

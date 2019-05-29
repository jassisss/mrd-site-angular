import {Component} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showLoadingIndicator = false;

  constructor(private _router: Router) {

    this._router.events.subscribe((routeEvent: Event) => {

      if (routeEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      setTimeout(() => {
        if (routeEvent instanceof NavigationEnd ||
          routeEvent instanceof NavigationCancel ||
          routeEvent instanceof NavigationError) {
          this.showLoadingIndicator = false;
        }
      }, 500);


    });
  }

}

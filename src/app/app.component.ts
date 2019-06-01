import {Component} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { LyTheme2, ThemeVariables } from '@alyle/ui';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly classes = this.theme.addStyleSheet(STYLES);

  showLoadingIndicator = false;

  constructor(private theme: LyTheme2,
              private router: Router) {

    this.router.events.subscribe((routeEvent: Event) => {

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

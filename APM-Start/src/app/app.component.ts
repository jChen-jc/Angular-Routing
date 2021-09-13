import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationError, NavigationEnd, NavigationCancel, RouterEvent } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading: boolean = true;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private route:Router) {
    route.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent)
    })
  }

  checkRouterEvent(routerEvent: Event):void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    // this.route.navigate(['/welcome']);
    this.route.navigateByUrl('/welcome'); // totally replace the url
  }
}

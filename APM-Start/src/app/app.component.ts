import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationError, NavigationEnd, NavigationCancel, RouterEvent } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
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

  get isShowMessage(): boolean {
    if (this.message.isDisplayed) {
      return this.message.isDisplayed;
    }
    return false;
  }

  constructor(private authService: AuthService, private route:Router, private message:MessageService) {
    route.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent)
    })
  }

  ngOnInit() {
    console.log("this.router", this.route)
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

  // wont work upon page refresh
  toggleMessage():void {
    // [routerLink]="[{ outlets: { popup: ['messages'] }}]"
    if (!this.isShowMessage === true) {
      this.route.navigate([{ outlets: { popup: ['messages'] }}]);
    } else {
      this.route.navigate([{ outlets: { popup: null }}])
    }
    this.message.isDisplayed = !this.isShowMessage;
  }
}

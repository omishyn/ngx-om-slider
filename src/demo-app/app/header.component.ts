import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { environment } from '../environments/environment';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarCollapsed: boolean = true;
  atRootUrl: boolean = false;
  atDocsUrl: boolean = false;
  urlSub: any;
  enableExternalImages: boolean = environment.enableExternalImages;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.urlSub = this.router.events.pipe(
      // tslint:disable-next-line:typedef
      filter((e) => e instanceof NavigationEnd)
    ).subscribe(
      // tslint:disable-next-line:typedef
      (event: NavigationEnd) => {
        this.atRootUrl = event.url === '/' || event.url === '/home';
        this.atDocsUrl = event.url.indexOf('/docs') === 0;
      }
    );
  }

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }
}

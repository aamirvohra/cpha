import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  protected skinnyHeader: boolean;

  @ViewChild('headerWrapper')
  private headerWrapper: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(
        (event: NavigationEnd) => {
          if (event.url !== '/') {
            this.skinnyHeader = true;
            this.headerWrapper.nativeElement.classList.add('skinny-search');
          }
          else {
            this.skinnyHeader = false;
            this.headerWrapper.nativeElement.classList.remove('skinny-search');
          }
        }
      )
  }

}

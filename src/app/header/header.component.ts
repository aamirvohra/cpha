import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output()
  protected mobileSidebarVisibility: EventEmitter<boolean>;

  protected skinnyHeader: boolean;

  @ViewChild('headerWrapper')
  private headerWrapper: ElementRef;

  @Input('isMobileNavVisible')
  protected isMobileNavVisible: boolean;

  constructor(private router: Router) {
    this.isMobileNavVisible = false;
    this.mobileSidebarVisibility = new EventEmitter();
  }

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

  toggleMobileNav() {
    this.isMobileNavVisible = !this.isMobileNavVisible;
    this.mobileSidebarVisibility.emit(this.isMobileNavVisible);
  }

}

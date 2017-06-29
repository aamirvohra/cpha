import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';

const windowObject = window;

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

  protected hideSearch: boolean;

  // fixed header only for query detail page
  // and mobile viewport
  protected fixedHeader: boolean;

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
            if (event.url === '/query/detail') {
              this.hideSearch = true;
              this.fixedHeader = true;

              this.registerOnScroll();
            }

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

  registerOnScroll() {
    windowObject.addEventListener('scroll',
      () => {
        const scrollTop = $(windowObject).scrollTop();

        if (scrollTop > 100) {
          $('.header-wrapper').removeClass('scroll-up').addClass('scroll-down')
        }
        else {
          $('.header-wrapper').removeClass('scroll-down').addClass('scroll-up')
        }
      }
    )
  }

}

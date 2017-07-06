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

  protected lightHeader: boolean;

  @ViewChild('headerWrapper')
  private headerWrapper: ElementRef;

  @Input('isMobileNavVisible')
  protected isMobileNavVisible: boolean;

  // below flags are used for mobile view for routes other than homepage
  protected displaySearchIcon: boolean;

  // on search toggle, toggle search bar
  protected isSearchVisible: boolean;

  private lastScrollPos: number;

  // fixed header only for query detail page
  // and mobile viewport
  // protected fixedHeader: boolean;

  constructor(private router: Router) {
    this.isMobileNavVisible = false;
    this.mobileSidebarVisibility = new EventEmitter();
    this.displaySearchIcon = false;
    this.isSearchVisible = true;
    this.lightHeader = false;
    this.lastScrollPos = 0;
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(
        (event: NavigationEnd) => {
          if (event.url !== '/') {
            if (event.url === '/query/detail') {
              // this.fixedHeader = true;

              this.registerOnScroll();
            }

            // we need light header in pages other than root
            this.lightHeader = true;
            this.isSearchVisible  = true;
            this.displaySearchIcon = false; // as search is visble no search icon visible at this point
            this.headerWrapper.nativeElement.classList.add('light-header');
          }
          else {
            this.lightHeader = false;
            // make the search visible if navigated back to root from any other page
            // @Todo also clear the text in search
            this.isSearchVisible = true;
            this.headerWrapper.nativeElement.classList.remove('light-header');
          }
        }
      )
  }

  toggleMobileNav() {
    this.isMobileNavVisible = !this.isMobileNavVisible;
    this.mobileSidebarVisibility.emit(this.isMobileNavVisible);
  }

  toggleSearchIcon() {
    this.displaySearchIcon = !this.displaySearchIcon;

    // if search icon is visible means search bar should be hidden
    if (this.displaySearchIcon) {
      this.isSearchVisible = false;
    }
    else {
      this.isSearchVisible = true;
    }
  }

  registerOnScroll() {
    windowObject.addEventListener('scroll',
      () => {
        const scrollTop = $(windowObject).scrollTop();

        if (scrollTop > this.lastScrollPos) {
          $('.header-wrapper').removeClass('scroll-up').addClass('scroll-down')
        }
        else {
          $('.header-wrapper').removeClass('scroll-down').addClass('scroll-up')
        }

        this.lastScrollPos = scrollTop
      }
    )
  }

}

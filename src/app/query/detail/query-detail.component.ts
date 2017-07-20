import { Component, OnInit } from '@angular/core';
import { SearchHelper } from '../../../services/search-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { DrugLookupService } from '../../../services/drug-lookup.service';
import { DrugInfo } from '../../../models/drug-info';
import * as $ from 'jquery';

const windowObject = window;

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {

  protected info: DrugInfo;

  // only for mobile as other viewports will always display table of contents
  private isTableOfContentsVisible: boolean;

  private lastScrollPos: number;

  constructor(private searchHelper: SearchHelper,
              private drugLookup: DrugLookupService,
              private route: ActivatedRoute,
              private router: Router) {
    this.lastScrollPos = 0;
    this.isTableOfContentsVisible = false;
  }

  ngOnInit() {
    let fragmentId: string;
    let docLocator: string;

    this.route.queryParams.subscribe(
      params => {
        if (params.query) {
          const fragmentIndex = params.query.indexOf('#');
          if (fragmentIndex !== -1) {
            fragmentId = params.query.substring(fragmentIndex);
            docLocator = params.query.substring(0, fragmentIndex);
          }
          else {
            docLocator = params.query;
          }

          this.getDrugDetailedInformation(docLocator, fragmentId);
        }
      }
    );
    this.registerOnScroll();
  }

  getDrugDetailedInformation(item, fragmentId?) {
    this.drugLookup.detailedInfo(item).subscribe(
      data => {
        this.info = data;

        if (fragmentId) {
          this.anchorNavigation(fragmentId);
        }
      }
    )
  }

  anchorNavigation(fragmentId) {
    // if mobile table of content is open lets close it
    this.isTableOfContentsVisible = false;
    this.hideTableOfContents();

    const element = document.querySelector(fragmentId);
    if (element) {
      element.scrollIntoView(element)
    }
  }

  toggleTableOfContents() {
    this.isTableOfContentsVisible = !this.isTableOfContentsVisible;
    // add class to style the contents for mobile

    if (this.isTableOfContentsVisible) {
      $('.table-contents').removeClass('hidden-xs').addClass('xs-table-contents');
    }
    else {
      this.hideTableOfContents();
    }
  }

  private hideTableOfContents() {
    $('.table-contents').removeClass('xs-table-contents').addClass('hidden-xs');
  }

  registerOnScroll() {
    windowObject.addEventListener('scroll',
      () => {
        const scrollTop = $(windowObject).scrollTop();

        // if (scrollTop > this.lastScrollPos) {
        //   $('.drug-overview').removeClass('scroll-up').addClass('scroll-down')
        // }
        // else {
        //   $('.drug-overview').removeClass('scroll-down').addClass('scroll-up')
        // }

        if (scrollTop > this.lastScrollPos) {
          $('.drug-overview').removeClass('scroll-up').addClass('scroll-down')
        }
        else {
          if (scrollTop < 100) { /// ?????
            $('.drug-overview').removeClass('scroll-down').addClass('scroll-up');
          }
        }

        this.lastScrollPos = scrollTop
      }
    )
  }
}

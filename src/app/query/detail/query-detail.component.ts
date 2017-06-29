import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('tableContents')
  private tableContents: ElementRef;

  constructor(private searchHelper: SearchHelper,
              private drugLookup: DrugLookupService,
              private route: ActivatedRoute,
              private router: Router) {
    this.searchHelper._searchEvent.subscribe(
      (item: any) => {
        this.getDrugDetailedInformation(item);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        // do a search
      }
    );
    this.registerOnScroll();
  }

  getDrugDetailedInformation(item) {
    this.drugLookup.detailedInfo().subscribe(
      data => {
        this.info = data;
      }
    )
  }

  anchorNavigation(fragmentId) {
    const element = document.querySelector(fragmentId);
    if (element) {
      element.scrollIntoView(element)
    }
  }

  registerOnScroll() {
    windowObject.addEventListener( 'scroll',
      () => {
        const scrollTop = $(windowObject).scrollTop();

        if (scrollTop > 100) {
          console.log(scrollTop);
          $('.overview').removeClass('scroll-up').addClass('scroll-down')
        }
        else {
          $('.overview').removeClass('scroll-down').addClass('scroll-up')
        }
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { SearchHelper } from '../../../services/search-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { DrugLookupService } from '../../../services/drug-lookup.service';
import { DrugInfo } from '../../../models/drug-info';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {

  protected info: DrugInfo;

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
  }

  getDrugDetailedInformation(item) {
    this.drugLookup.detailedInfo().subscribe(
      data => {
        this.info = data;
        console.log(this.info);
      }
    )
  }

  anchorNavigation(fragmentId) {
    const element = document.querySelector(fragmentId);
    if (element) {
      element.scrollIntoView(element)
    }
  }

}

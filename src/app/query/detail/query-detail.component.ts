import { Component, OnInit } from '@angular/core';
import { SearchHelper } from '../../../services/search-helper';
import { ActivatedRoute } from '@angular/router';
import { DrugLookupService } from '../../../services/drug-lookup.service';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {

  protected info: any;

  constructor(private searchHelper: SearchHelper,
              private drugLookup: DrugLookupService,
              private route: ActivatedRoute) {
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
      }
    )
  }

}

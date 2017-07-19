import { Component, OnInit } from '@angular/core';
import { DrugLookupService } from '../../../services/drug-lookup.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  private queryListData: any;

  constructor(private lookupService: DrugLookupService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.query) {
          this.lookupService.getListInfo(params.query).subscribe(
            data => {
              console.log(data);
              this.queryListData = data;
            }
          )
        }
      }
    )
    // fetch query list info
  }

  navigateToDetails(docLocator: string) {
    this.router.navigate(['query/detail'], {
      queryParams: {
        query: docLocator
      }
    })
  }

}

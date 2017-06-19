import { Component, OnInit } from '@angular/core';
import { DrugLookupService } from '../../../services/drug-lookup.service';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  private queryListData: any;

  constructor(private lookupService: DrugLookupService) { }

  ngOnInit() {
    // fetch query list info
    this.lookupService.getListInfo().subscribe(
      data => {
        this.queryListData = data;
      }
    )
  }

}

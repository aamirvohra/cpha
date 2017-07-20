import { Component, OnInit } from '@angular/core';
import { DrugLookupService } from '../../../services/drug-lookup.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sort } from '../../../models/drug-lookup';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  private queryListData: any;
  protected queryListForm: FormGroup;

  constructor(private lookupService: DrugLookupService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.queryListForm = this.formBuilder.group({
      sortBy: ['RELEVANCE'],
      query: ['']
    });

    this.queryListForm.controls['sortBy'].valueChanges.subscribe(
      sortValue => {
        this.getListData(this.queryListForm.controls['query'].value, sortValue);
      }
    )
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.query) {
          this.queryListForm.controls['query'].setValue(params.query);
          this.getListData(params.query, this.queryListForm.controls['sortBy'].value);
        }
      }
    )
    // fetch query list info
  }

  getListData(query: string, sortBy: sort) {
    this.lookupService.getListInfo(query, sortBy).subscribe(
      data => {
        this.queryListData = data;
      }
    )
  }

  navigateToDetails(docLocator: string) {
    console.log(docLocator);
    this.router.navigate(['query/detail'], {
      queryParams: {
        query: docLocator
      }
    })
  }

}

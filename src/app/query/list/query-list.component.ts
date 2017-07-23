import { Component, OnInit } from '@angular/core';
import { DrugLookupService } from '../../../services/drug-lookup.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sort } from '../../../models/drug-lookup';
import * as $ from 'jquery';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {

  private queryListData: any;
  protected queryListForm: FormGroup;
  protected isCollapsed: boolean;

  protected currentPage: number;
  // protected pageNumber: number;

  constructor(private lookupService: DrugLookupService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.queryListForm = this.formBuilder.group({
      sortBy: ['RELEVANCE'],
      query: [''],
    });

    this.isCollapsed = false;
    this.currentPage = 1;
    // this.pageNumber = 0;

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

  getListData(query: string, sortBy: sort, pageNumber?: number) {
    this.lookupService.getListInfo(query, sortBy, pageNumber).subscribe(
      data => {
        this.queryListData = data;

        // this.pageNumber = Math.ceil(this.queryListData && this.queryListData.totalCount / 25);
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

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleHighlight() {
    $('.MatchedText').each(
      (int, el) => {
        if ($(el).hasClass('removeHighlight')) {
          $(el).removeClass('removeHighlight')
        }
        else {
          $(el).addClass('removeHighlight')
        }
      }
    )
  }

  pageChanged(pageEvent) {
    this.getListData(this.queryListForm.controls['query'].value,
      this.queryListForm.controls['sortBy'].value, pageEvent.page);
  }

}

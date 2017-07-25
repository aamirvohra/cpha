import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchHelper } from '../../services/search-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DrugLookupService } from '../../services/drug-lookup.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;
  protected autoCompleteDS: Observable<any>;

  @Input('skinnyHeader')
  protected skinnyHeader: boolean;

  constructor(private searchHelper: SearchHelper,
              private formBuilder: FormBuilder,
              private drugLookup: DrugLookupService,
              private router: Router,
              private route: ActivatedRoute) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    this.autoCompleteDS = Observable.create(
      observer => {
        this.drugLookup.autoComplete(this.searchForm.controls['search'] ?
            this.searchForm.controls['search'].value : '')
          .subscribe(
            data => {
              observer.next(data);
            }
          )
      }
    );

    // when the user clicks on did you mean we can subscribe to it and update the list
    this.searchHelper._searchEvent.subscribe(
      suggestion => {
        if (suggestion) {
          this.searchForm.controls['search'].setValue(suggestion);
        }
      }
    )
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params.query) {
          this.searchForm.controls['search'].setValue(params.query);
        }
      }
    )
  }

  public clear() {
    this.searchForm.controls.search.setValue(null);
  }

  search(autoCompleteItem?: TypeaheadMatch) {
    if (this.searchForm.valid) {

      if (autoCompleteItem) {
        // item could also have a suggestion search
        if (autoCompleteItem.item.locator) {
          this.navigateToDetailPage();
        }
        else {
          this.navigateToListPage(this.searchForm.controls['search'].value);
        }
      }
      else {
        // this a suggestion search as no auto complete is provided
        this.navigateToListPage(this.searchForm.controls['search'].value);
      }
    }
  }

  navigateToDetailPage() {
    // if a suggestion search then navigate to query list
    // else navigate to the detail page
    this.navigate('query/detail');
  }

  navigateToListPage(queryParam: string) {
    this.navigate('query/list', queryParam);
  }

  navigate(url: string, queryParam?) {
    this.router.navigate([url], {
      queryParams: {
        query: queryParam
      }
    });
  }

  onSelect(item?: TypeaheadMatch) {
    // we need to know if this is an exact search or suggestion search??
    if (item) {
      this.search(item);
    }
  }

}

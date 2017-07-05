import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchHelper } from '../../services/search-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DrugLookupService } from '../../services/drug-lookup.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;
  // protected autoCompleteDS: Observable<any>;
  protected mockData: any;

  @Input('skinnyHeader')
  protected skinnyHeader: boolean;

  constructor(private searchHelper: SearchHelper,
              private formBuilder: FormBuilder,
              private drugLookup: DrugLookupService,
              private router: Router) {
    // this.autoCompleteDS = Observable.create(
    //   observer => {
    //     observer.next();
    //   }
    // ).mergeMap(
    //   this.drugLookup.autoComplete()
    // );

    // this.router.events
    //   .filter(event => event instanceof NavigationEnd)
    //   .subscribe(
    //     (event: NavigationEnd) => {
    //       if (event.url !== '/') {
    //         this.skinnyHeader = true;
    //         console.log(this.skinnyHeader);
    //       }
    //     }
    // )
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    this.drugLookup.autoComplete().subscribe(
      data => {
        this.mockData = data;
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
          this.navigateToListPage();
        }
      }
      else {
        // this a suggestion search as no auto complete is provided
        this.navigateToListPage();
      }

      // this.searchHelper.broadcastSearchEvent(item.item);
      // this.router.navigate(['/query/detail'])
    }
  }

  navigateToDetailPage() {
    // if a suggestion search then navigate to query list
    // else navigate to the detail page
    this.navigate('query/detail');
  }

  navigateToListPage() {
    this.navigate('query/list');
  }

  navigate(url: string) {
   this.router.navigate([url]);
  }

  onSelect(item?: TypeaheadMatch) {
    // we need to know if this is an exact search or suggestion search??
    if (item) {
      this.search(item);
    }
  }

}

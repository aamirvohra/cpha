import { Component, OnInit } from '@angular/core';
import { SearchHelper } from '../../services/search-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DrugLookupService } from '../../services/drug-lookup.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;
  // protected autoCompleteDS: Observable<any>;
  protected mockData: any;

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

  search(item) {
    if (this.searchForm.valid) {
      console.log(this.searchForm.controls['search'].value);
      this.searchHelper.broadcastSearchEvent(item.item);
      this.router.navigate(['/query/detail'])
    }
  }

  onSelect(item: TypeaheadMatch) {
    console.log(item);
    this.search(item);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { SearchHelper } from '../../services/search-helper';

@Component({
  selector: 'app-result-not-found',
  templateUrl: './result-not-found.component.html',
  styleUrls: ['./result-not-found.component.scss']
})
export class ResultNotFoundComponent implements OnInit {

  @Input ('didYouMean')
  protected didYouMean: string;

  constructor(private searchHelper: SearchHelper) { }

  ngOnInit() {
  }

  suggestSearch() {
    this.searchHelper.broadcastSearchEvent(this.didYouMean.replace('<b>', '').replace('</b>', ''));
  }

}

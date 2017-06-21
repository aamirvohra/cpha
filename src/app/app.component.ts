import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'app';

  protected mobileSidebarVisiblity: boolean;

  constructor() {
    this.mobileSidebarVisiblity = false;
  }

  public toggleMobileSidebarVisiblity(value) {
    this.mobileSidebarVisiblity = value;
  }


}

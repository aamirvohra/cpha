import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSidebarNavComponent } from './mobile-sidebar-nav.component';

describe('MobileSidebarNavComponent', () => {
  let component: MobileSidebarNavComponent;
  let fixture: ComponentFixture<MobileSidebarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSidebarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSidebarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

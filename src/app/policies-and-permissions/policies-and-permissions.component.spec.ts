import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesAndPermissionsComponent } from './policies-and-permissions.component';

describe('PoliciesAndPermissionsComponent', () => {
  let component: PoliciesAndPermissionsComponent;
  let fixture: ComponentFixture<PoliciesAndPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliciesAndPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesAndPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

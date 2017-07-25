import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNotFoundComponent } from './result-not-found.component';

describe('ResultNotFoundComponent', () => {
  let component: ResultNotFoundComponent;
  let fixture: ComponentFixture<ResultNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

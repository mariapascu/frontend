import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemHistoryComponent } from './problem-history.component';

describe('ProblemHistoryComponent', () => {
  let component: ProblemHistoryComponent;
  let fixture: ComponentFixture<ProblemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

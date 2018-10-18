import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphMatCardComponent } from './graph-mat-card.component';

describe('GraphMatCardComponent', () => {
  let component: GraphMatCardComponent;
  let fixture: ComponentFixture<GraphMatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphMatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

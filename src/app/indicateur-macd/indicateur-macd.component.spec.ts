import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurMacdComponent } from './indicateur-macd.component';

describe('IndicateurMacdComponent', () => {
  let component: IndicateurMacdComponent;
  let fixture: ComponentFixture<IndicateurMacdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateurMacdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateurMacdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

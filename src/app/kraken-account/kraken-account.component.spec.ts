import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrakenAccountComponent } from './kraken-account.component';

describe('KrakenAccountComponent', () => {
  let component: KrakenAccountComponent;
  let fixture: ComponentFixture<KrakenAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrakenAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrakenAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

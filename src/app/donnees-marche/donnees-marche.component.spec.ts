import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesMarcheComponent } from './donnees-marche.component';

describe('IndicateurMacdComponent', () => {
  let component: DonneesMarcheComponent;
  let fixture: ComponentFixture<DonneesMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonneesMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneesMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

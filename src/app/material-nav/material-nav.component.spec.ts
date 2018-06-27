
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialNavComponent } from './material-nav.component';

describe('MaterialNavComponent', () => {
  let component: MaterialNavComponent;
  let fixture: ComponentFixture<MaterialNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

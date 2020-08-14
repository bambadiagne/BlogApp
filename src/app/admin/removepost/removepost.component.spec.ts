import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovepostComponent } from './removepost.component';

describe('RemovepostComponent', () => {
  let component: RemovepostComponent;
  let fixture: ComponentFixture<RemovepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

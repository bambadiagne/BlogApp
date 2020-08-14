import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostsComponent } from './single-posts.component';

describe('SinglePostsComponent', () => {
  let component: SinglePostsComponent;
  let fixture: ComponentFixture<SinglePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

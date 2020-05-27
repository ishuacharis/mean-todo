import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStatusComponent } from './todo-status.component';

describe('TodoStatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

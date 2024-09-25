import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddestimacionComponent } from './addestimacion.component';

describe('AddestimacionComponent', () => {
  let component: AddestimacionComponent;
  let fixture: ComponentFixture<AddestimacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddestimacionComponent]
    });
    fixture = TestBed.createComponent(AddestimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

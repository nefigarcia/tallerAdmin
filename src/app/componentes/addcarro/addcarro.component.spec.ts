import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarroComponent } from './addcarro.component';

describe('AddcarroComponent', () => {
  let component: AddcarroComponent;
  let fixture: ComponentFixture<AddcarroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcarroComponent]
    });
    fixture = TestBed.createComponent(AddcarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

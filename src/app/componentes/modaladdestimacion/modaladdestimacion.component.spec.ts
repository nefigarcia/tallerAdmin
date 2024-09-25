import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdestimacionComponent } from './modaladdestimacion.component';

describe('ModaladdestimacionComponent', () => {
  let component: ModaladdestimacionComponent;
  let fixture: ComponentFixture<ModaladdestimacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaladdestimacionComponent]
    });
    fixture = TestBed.createComponent(ModaladdestimacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

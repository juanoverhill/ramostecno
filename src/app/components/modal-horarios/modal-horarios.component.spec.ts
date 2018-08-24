import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHorariosComponent } from './modal-horarios.component';

describe('ModalHorariosComponent', () => {
  let component: ModalHorariosComponent;
  let fixture: ComponentFixture<ModalHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

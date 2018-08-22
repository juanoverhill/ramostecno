import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionReparacionComponent } from './modal-seleccion-reparacion.component';

describe('ModalSeleccionReparacionComponent', () => {
  let component: ModalSeleccionReparacionComponent;
  let fixture: ComponentFixture<ModalSeleccionReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

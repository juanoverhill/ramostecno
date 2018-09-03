import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoConfirmadoPage } from './turno-confirmado.page';

describe('TurnoConfirmadoPage', () => {
  let component: TurnoConfirmadoPage;
  let fixture: ComponentFixture<TurnoConfirmadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoConfirmadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoConfirmadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTurnosPage } from './historial-turnos.page';

describe('HistorialTurnosPage', () => {
  let component: HistorialTurnosPage;
  let fixture: ComponentFixture<HistorialTurnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialTurnosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTurnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

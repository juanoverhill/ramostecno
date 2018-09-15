import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarReparacionesPage } from './administrar-reparaciones.page';

describe('AdministrarReparacionesPage', () => {
  let component: AdministrarReparacionesPage;
  let fixture: ComponentFixture<AdministrarReparacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarReparacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarReparacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnistrarEquiposPage } from './admnistrar-equipos.page';

describe('AdmnistrarEquiposPage', () => {
  let component: AdmnistrarEquiposPage;
  let fixture: ComponentFixture<AdmnistrarEquiposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmnistrarEquiposPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmnistrarEquiposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

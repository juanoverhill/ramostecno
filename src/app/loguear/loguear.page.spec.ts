import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoguearPage } from './loguear.page';

describe('LoguearPage', () => {
  let component: LoguearPage;
  let fixture: ComponentFixture<LoguearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoguearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoguearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

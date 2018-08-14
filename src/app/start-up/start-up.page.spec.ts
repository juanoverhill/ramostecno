import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpPage } from './start-up.page';

describe('StartUpPage', () => {
  let component: StartUpPage;
  let fixture: ComponentFixture<StartUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

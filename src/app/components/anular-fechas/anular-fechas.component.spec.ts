import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularFechasComponent } from './anular-fechas.component';

describe('AnularFechasComponent', () => {
  let component: AnularFechasComponent;
  let fixture: ComponentFixture<AnularFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

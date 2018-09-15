import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosTrabajoComponent } from './horarios-trabajo.component';

describe('HorariosTrabajoComponent', () => {
  let component: HorariosTrabajoComponent;
  let fixture: ComponentFixture<HorariosTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

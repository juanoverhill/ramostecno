import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTurnoComponent } from './nuevo-turno.component';

describe('NuevoTurnoComponent', () => {
  let component: NuevoTurnoComponent;
  let fixture: ComponentFixture<NuevoTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

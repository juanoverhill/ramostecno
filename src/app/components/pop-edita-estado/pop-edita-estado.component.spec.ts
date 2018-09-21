import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopEditaEstadoComponent } from './pop-edita-estado.component';

describe('PopEditaEstadoComponent', () => {
  let component: PopEditaEstadoComponent;
  let fixture: ComponentFixture<PopEditaEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopEditaEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopEditaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

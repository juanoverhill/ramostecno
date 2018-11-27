import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorImagenComponent } from './visor-imagen.component';

describe('VisorImagenComponent', () => {
  let component: VisorImagenComponent;
  let fixture: ComponentFixture<VisorImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

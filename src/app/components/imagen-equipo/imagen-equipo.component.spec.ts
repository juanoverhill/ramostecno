import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenEquipoComponent } from './imagen-equipo.component';

describe('ImagenEquipoComponent', () => {
  let component: ImagenEquipoComponent;
  let fixture: ComponentFixture<ImagenEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

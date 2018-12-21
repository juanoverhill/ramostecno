import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorMarcaComponent } from './selector-marca.component';

describe('SelectorMarcaComponent', () => {
  let component: SelectorMarcaComponent;
  let fixture: ComponentFixture<SelectorMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

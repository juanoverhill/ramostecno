import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopListaChatsComponent } from './pop-lista-chats.component';

describe('PopListaChatsComponent', () => {
  let component: PopListaChatsComponent;
  let fixture: ComponentFixture<PopListaChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopListaChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopListaChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgenteComponent } from './menu-agente.component';

describe('MenuAgenteComponent', () => {
  let component: MenuAgenteComponent;
  let fixture: ComponentFixture<MenuAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

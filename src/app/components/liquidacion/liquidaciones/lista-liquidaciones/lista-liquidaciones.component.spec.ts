import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLiquidacionesComponent } from './lista-liquidaciones.component';

describe('ListaLiquidacionesComponent', () => {
  let component: ListaLiquidacionesComponent;
  let fixture: ComponentFixture<ListaLiquidacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLiquidacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLiquidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

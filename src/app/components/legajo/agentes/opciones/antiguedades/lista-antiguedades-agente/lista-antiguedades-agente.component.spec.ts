import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAntiguedadesAgenteComponent } from './lista-antiguedades-agente.component';

describe('ListaAntiguedadesAgenteComponent', () => {
  let component: ListaAntiguedadesAgenteComponent;
  let fixture: ComponentFixture<ListaAntiguedadesAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAntiguedadesAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAntiguedadesAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

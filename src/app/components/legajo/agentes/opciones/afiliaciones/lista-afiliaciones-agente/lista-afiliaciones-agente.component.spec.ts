import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAfiliacionesAgenteComponent } from './lista-afiliaciones-agente.component';

describe('ListaAfiliacionesAgenteComponent', () => {
  let component: ListaAfiliacionesAgenteComponent;
  let fixture: ComponentFixture<ListaAfiliacionesAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAfiliacionesAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAfiliacionesAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

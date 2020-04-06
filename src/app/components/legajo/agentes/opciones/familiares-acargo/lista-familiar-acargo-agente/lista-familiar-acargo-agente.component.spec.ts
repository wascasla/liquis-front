import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFamiliarAcargoAgenteComponent } from './lista-familiar-acargo-agente.component';

describe('ListaFamiliarAcargoAgenteComponent', () => {
  let component: ListaFamiliarAcargoAgenteComponent;
  let fixture: ComponentFixture<ListaFamiliarAcargoAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFamiliarAcargoAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFamiliarAcargoAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

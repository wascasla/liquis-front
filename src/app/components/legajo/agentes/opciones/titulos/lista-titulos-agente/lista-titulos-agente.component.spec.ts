import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTitulosAgenteComponent } from './lista-titulos-agente.component';

describe('ListaTitulosAgenteComponent', () => {
  let component: ListaTitulosAgenteComponent;
  let fixture: ComponentFixture<ListaTitulosAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTitulosAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTitulosAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

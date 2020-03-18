import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAgentesComponent } from './listado-agentes.component';

describe('ListadoAgentesComponent', () => {
  let component: ListadoAgentesComponent;
  let fixture: ComponentFixture<ListadoAgentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoAgentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

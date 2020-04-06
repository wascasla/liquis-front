import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrenatalAgenteComponent } from './lista-prenatal-agente.component';

describe('ListaPrenatalAgenteComponent', () => {
  let component: ListaPrenatalAgenteComponent;
  let fixture: ComponentFixture<ListaPrenatalAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrenatalAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrenatalAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

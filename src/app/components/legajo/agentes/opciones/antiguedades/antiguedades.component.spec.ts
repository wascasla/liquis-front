import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiguedadesComponent } from './antiguedades.component';

describe('AntiguedadesComponent', () => {
  let component: AntiguedadesComponent;
  let fixture: ComponentFixture<AntiguedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiguedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiguedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

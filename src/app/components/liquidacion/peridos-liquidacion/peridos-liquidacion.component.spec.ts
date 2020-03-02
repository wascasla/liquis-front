import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeridosLiquidacionComponent } from './peridos-liquidacion.component';

describe('PeridosLiquidacionComponent', () => {
  let component: PeridosLiquidacionComponent;
  let fixture: ComponentFixture<PeridosLiquidacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeridosLiquidacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeridosLiquidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

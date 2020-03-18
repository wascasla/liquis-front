import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaresACargoComponent } from './familiares-acargo.component';

describe('FamiliaresACargoComponent', () => {
  let component: FamiliaresACargoComponent;
  let fixture: ComponentFixture<FamiliaresACargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaresACargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaresACargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

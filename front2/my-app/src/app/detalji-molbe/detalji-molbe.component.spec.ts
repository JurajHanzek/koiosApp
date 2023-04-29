import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiMolbeComponent } from './detalji-molbe.component';

describe('DetaljiMolbeComponent', () => {
  let component: DetaljiMolbeComponent;
  let fixture: ComponentFixture<DetaljiMolbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiMolbeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaljiMolbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

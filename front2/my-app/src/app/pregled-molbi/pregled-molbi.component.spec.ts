import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledMolbiComponent } from './pregled-molbi.component';

describe('PregledMolbiComponent', () => {
  let component: PregledMolbiComponent;
  let fixture: ComponentFixture<PregledMolbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledMolbiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledMolbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

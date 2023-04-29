import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMolbaComponent } from './nova-molba.component';

describe('NovaMolbaComponent', () => {
  let component: NovaMolbaComponent;
  let fixture: ComponentFixture<NovaMolbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaMolbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaMolbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

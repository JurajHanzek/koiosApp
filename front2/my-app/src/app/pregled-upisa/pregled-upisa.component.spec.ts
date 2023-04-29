import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledUpisaComponent } from './pregled-upisa.component';

describe('PregledUpisaComponent', () => {
  let component: PregledUpisaComponent;
  let fixture: ComponentFixture<PregledUpisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledUpisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledUpisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

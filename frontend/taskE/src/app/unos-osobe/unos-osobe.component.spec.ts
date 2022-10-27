import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosOsobeComponent } from './unos-osobe.component';

describe('UnosOsobeComponent', () => {
  let component: UnosOsobeComponent;
  let fixture: ComponentFixture<UnosOsobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosOsobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosOsobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

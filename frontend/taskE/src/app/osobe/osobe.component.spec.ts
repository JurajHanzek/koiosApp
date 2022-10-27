import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobeComponent } from './osobe.component';

describe('OsobeComponent', () => {
  let component: OsobeComponent;
  let fixture: ComponentFixture<OsobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavijestiComponent } from './obavijesti.component';

describe('ObavijestiComponent', () => {
  let component: ObavijestiComponent;
  let fixture: ComponentFixture<ObavijestiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObavijestiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavijestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

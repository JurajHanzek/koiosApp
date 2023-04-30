import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpisiComponent } from './upisi.component';

describe('UpisiComponent', () => {
  let component: UpisiComponent;
  let fixture: ComponentFixture<UpisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpisiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

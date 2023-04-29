import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviUpisComponent } from './novi-upis.component';

describe('NoviUpisComponent', () => {
  let component: NoviUpisComponent;
  let fixture: ComponentFixture<NoviUpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviUpisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviUpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

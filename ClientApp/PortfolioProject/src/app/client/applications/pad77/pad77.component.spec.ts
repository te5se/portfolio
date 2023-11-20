import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pad77Component } from './pad77.component';

describe('Pad77Component', () => {
  let component: Pad77Component;
  let fixture: ComponentFixture<Pad77Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pad77Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pad77Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

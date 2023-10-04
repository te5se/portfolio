import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pws03Component } from './pws03.component';

describe('Pws03Component', () => {
  let component: Pws03Component;
  let fixture: ComponentFixture<Pws03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pws03Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pws03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

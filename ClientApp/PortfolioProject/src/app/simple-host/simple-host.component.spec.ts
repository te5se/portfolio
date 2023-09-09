import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHostComponent } from './simple-host.component';

describe('SimpleHostComponent', () => {
  let component: SimpleHostComponent;
  let fixture: ComponentFixture<SimpleHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

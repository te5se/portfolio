import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTestComponent } from './refresh-test.component';

describe('RefreshTestComponent', () => {
  let component: RefreshTestComponent;
  let fixture: ComponentFixture<RefreshTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

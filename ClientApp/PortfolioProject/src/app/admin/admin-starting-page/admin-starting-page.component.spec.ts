import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartingPageComponent } from './admin-starting-page.component';

describe('AdminStartingPageComponent', () => {
  let component: AdminStartingPageComponent;
  let fixture: ComponentFixture<AdminStartingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStartingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCubeItemComponent } from './schedule-cube-item.component';

describe('ScheduleCubeItemComponent', () => {
  let component: ScheduleCubeItemComponent;
  let fixture: ComponentFixture<ScheduleCubeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCubeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCubeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

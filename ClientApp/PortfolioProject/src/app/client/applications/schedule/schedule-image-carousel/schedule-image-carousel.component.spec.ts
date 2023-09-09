import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleImageCarouselComponent } from './schedule-image-carousel.component';

describe('ScheduleImageCarouselComponent', () => {
  let component: ScheduleImageCarouselComponent;
  let fixture: ComponentFixture<ScheduleImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleImageCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundBallComponent } from './background-ball.component';

describe('BackgroundBallComponent', () => {
  let component: BackgroundBallComponent;
  let fixture: ComponentFixture<BackgroundBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundBallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

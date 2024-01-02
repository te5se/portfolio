import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MESComponent } from './mes.component';

describe('MESComponent', () => {
  let component: MESComponent;
  let fixture: ComponentFixture<MESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MESComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

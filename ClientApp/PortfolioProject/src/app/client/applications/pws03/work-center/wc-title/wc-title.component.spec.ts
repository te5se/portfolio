import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcTitleComponent } from './wc-title.component';

describe('WcTitleComponent', () => {
  let component: WcTitleComponent;
  let fixture: ComponentFixture<WcTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WcTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WcTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

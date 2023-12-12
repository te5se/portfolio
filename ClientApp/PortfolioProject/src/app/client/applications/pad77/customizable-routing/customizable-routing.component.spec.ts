import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableRoutingComponent } from './customizable-routing.component';

describe('CustomizableRoutingComponent', () => {
  let component: CustomizableRoutingComponent;
  let fixture: ComponentFixture<CustomizableRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizableRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHostComponent } from './client-host.component';

describe('ClientHostComponent', () => {
  let component: ClientHostComponent;
  let fixture: ComponentFixture<ClientHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

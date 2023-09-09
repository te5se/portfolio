import { TestBed } from '@angular/core/testing';

import { CssVariablesService } from './css-variables.service';

describe('CssVariablesService', () => {
  let service: CssVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

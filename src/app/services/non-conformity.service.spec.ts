import { TestBed } from '@angular/core/testing';

import { NonConformityService } from './non-conformity.service';

describe('NonConformityService', () => {
  let service: NonConformityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonConformityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

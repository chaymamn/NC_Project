import { TestBed } from '@angular/core/testing';

import { NConformityMenuService } from './nconformity-menu.service';

describe('NConformityMenuService', () => {
  let service: NConformityMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NConformityMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

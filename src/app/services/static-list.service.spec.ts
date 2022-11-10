import { TestBed } from '@angular/core/testing';

import { StaticListService } from './static-list.service';

describe('StaticListService', () => {
  let service: StaticListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
